const cron = require("node-cron");

const Medicine =
require("../models/Medicine");

const User =
require("../models/User");

const {
sendReminderEmail,
} = require("../services/emailService");

const {
sendPushNotification,
} = require("../services/pushNotificationService");

const startReminderScheduler =
() => {

cron.schedule(
  "* * * * *",
  async () => {

    try {

      const now =
        new Date();

      const currentTime =
        `${String(
          now.getHours()
        ).padStart(
          2,
          "0"
        )}:${String(
          now.getMinutes()
        ).padStart(
          2,
          "0"
        )}`;

      console.log(
        "Checking Medicine Reminders..."
      );

      const medicines =
        await Medicine.find();

      for (
        const medicine of medicines
      ) {

        const reminderKey =
          `${new Date().toDateString()}-${currentTime}`;

        if (
          medicine.reminderTimes?.includes(
            currentTime
          ) &&
          medicine.lastReminderSent !==
            reminderKey
        ) {

          const user =
            await User.findById(
              medicine.user
            );

          if (!user)
            continue;

          if (
            user.emailReminders
          ) {

            await sendReminderEmail(
              user.email,
              medicine.medicineName,
              medicine.dosage
            );

          }

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
            `✅ Reminder sent for ${medicine.medicineName}`
          );

        }

      }

    } catch (error) {

      console.log(
        "Reminder Scheduler Error:",
        error
      );

    }

  }
);


};

module.exports =
startReminderScheduler;
