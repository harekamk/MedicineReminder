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

    // Indian Time
    const now = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    );

    const currentTime =
      `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    console.log(
      `Checking Medicine Reminders... ${currentTime}`
    );

    const medicines =
      await Medicine.find();

    for (const medicine of medicines) {

      console.log("--------------------------------");
      console.log("Medicine:", medicine.medicineName);
      console.log("Reminder Times:", medicine.reminderTimes);
      console.log("Current Time:", currentTime);
      console.log("Start Date:", medicine.startDate);
      console.log("Duration:", medicine.duration);

      // No reminder times
      if (
        !medicine.reminderTimes ||
        medicine.reminderTimes.length === 0
      ) {

        console.log("❌ No reminder times");

        continue;
      }

      // Current time doesn't match
      if (
        !medicine.reminderTimes.includes(currentTime)
      ) {

        console.log("❌ Time does not match");

        continue;
      }

      console.log("✅ Time matched");

      // Start Date
      const startDate = new Date(
        medicine.startDate + "T00:00:00"
      );

      startDate.setHours(0, 0, 0, 0);

      // End Date
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

        console.log("❌ Medicine not active");

        continue;

      }

      console.log("✅ Medicine is active");

      // Prevent duplicate reminders

      const reminderKey =
        `${today.toDateString()}-${currentTime}`;

      if (
        medicine.lastReminderSent === reminderKey
      ) {

        console.log("⏩ Already sent");

        continue;

      }

      const user =
        await User.findById(
          medicine.user
        );

      if (!user) {

        console.log("❌ User not found");

        continue;

      }

      // Email

      if (user.emailReminders) {

        console.log(
          `📧 Sending Email to ${user.email}`
        );

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

        console.log(
          "📱 Sending Push Notification"
        );

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
        `✅ Reminder sent for ${medicine.medicineName}`
      );

    }

    console.log("✅ Reminder Check Completed");

  }

  catch (error) {

    console.log(
      "Reminder Service Error:",
      error
    );

  }

};

module.exports = checkMedicineReminders;