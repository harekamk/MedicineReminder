const Medicine = require("../models/Medicine");
const User = require("../models/User");

const {
  sendReminderEmail,
} = require("./emailService");

const {
  sendPushNotification,
} = require("./pushNotificationService");

const checkMedicineReminders = async () => {
  try {
    // Indian Standard Time
    const now = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    );

    const currentTime = `${String(now.getHours()).padStart(
      2,
      "0"
    )}:${String(now.getMinutes()).padStart(2, "0")}`;

    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    console.log(
      `Checking Medicine Reminders at ${currentTime}`
    );

    const medicines = await Medicine.find();

    for (const medicine of medicines) {

      // Skip medicines without reminder times
      if (
        !medicine.reminderTimes ||
        medicine.reminderTimes.length === 0
      ) {
        continue;
      }

      // Find reminder within last 5 minutes
      const currentMinutes =
        now.getHours() * 60 + now.getMinutes();

      const matchedReminder =
        medicine.reminderTimes.find((time) => {
          const [hour, minute] = time
            .split(":")
            .map(Number);

          const reminderMinutes =
            hour * 60 + minute;

          const difference =
            currentMinutes - reminderMinutes;

          return (
            difference >= 0 &&
            difference <= 5
          );
        });

      if (!matchedReminder) {
        continue;
      }

      // Medicine active dates
      const startDate = new Date(
        medicine.startDate + "T00:00:00"
      );

      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(startDate);

      endDate.setDate(
        endDate.getDate() +
          Number(medicine.duration) -
          1
      );

      endDate.setHours(
        23,
        59,
        59,
        999
      );

      if (
        today < startDate ||
        today > endDate
      ) {
        continue;
      }

      // Prevent duplicate reminders
      const reminderKey = `${today.toDateString()}-${matchedReminder}`;

      if (
        medicine.lastReminderSent === reminderKey
      ) {
        continue;
      }

      const user = await User.findById(
        medicine.user
      );

      if (!user) {
        continue;
      }

      // Email Reminder
      if (user.emailReminders) {
        await sendReminderEmail(
          user.email,
          medicine.medicineName,
          medicine.dosage
        );
      }

      // Push Notification
      if (
        user.pushNotifications &&
        user.fcmToken
      ) {
        await sendPushNotification(
          user.fcmToken,
          "Medicine Reminder 💊",
          `Time to take ${medicine.medicineName} (${medicine.dosage})`
        );
      }

      medicine.lastReminderSent =
        reminderKey;

      await medicine.save();

      console.log(
        `Reminder sent -> ${medicine.medicineName} (${matchedReminder})`
      );
    }

    console.log(
      "Reminder Check Completed"
    );
  } catch (error) {
    console.log(
      "Reminder Service Error:",
      error.message
    );
  }
};

module.exports = checkMedicineReminders;