const Medicine = require("../models/Medicine");
const User = require("../models/User");

const {
  sendExpiryEmail,
} = require("./emailService");

const {
  sendPushNotification,
} = require("./pushNotificationService");

const checkExpiryReminders = async () => {

  try {

    const medicines =
      await Medicine.find();

    // Compare by calendar date only (ignore time-of-day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const medicine of medicines) {

      if (!medicine.expiryDate)
        continue;

      const expiryDate =
        new Date(medicine.expiryDate);
      expiryDate.setHours(0, 0, 0, 0);

      const daysLeft = Math.round(
        (expiryDate - today) /
        (1000 * 60 * 60 * 24)
      );

      // Only care about 2 days before, 1 day before, and the expiry day itself
      if (
        daysLeft !== 2 &&
        daysLeft !== 1 &&
        daysLeft !== 0
      ) {
        continue;
      }

      // Pick the right flag for this stage so each stage notifies only once
      let flagField = null;

      if (daysLeft === 2) {
        flagField = "expiryNotified2Days";
      } else if (daysLeft === 1) {
        flagField = "expiryNotified1Day";
      } else if (daysLeft === 0) {
        flagField = "expiryNotified0Day";
      }

      if (medicine[flagField]) {
        // Already notified for this stage
        continue;
      }

      const user = await User.findById(
        medicine.user
      );

      if (!user) continue;

      const title =
        daysLeft === 0
          ? "⚠️ Medicine Expired Today"
          : `⚠️ Medicine Expiring in ${daysLeft} day(s)`;

      const body =
        daysLeft === 0
          ? `${medicine.medicineName} expires today. Please stop using it.`
          : `${medicine.medicineName} will expire in ${daysLeft} day(s). Consider a refill.`;

      // Push Notification
      if (
        user.pushNotifications &&
        user.fcmToken
      ) {
        await sendPushNotification(
          user.fcmToken,
          title,
          body
        );
      }

      // Email Notification
      if (user.emailReminders) {
        await sendExpiryEmail(
          user.email,
          medicine.medicineName,
          medicine.expiryDate,
          daysLeft
        );
      }

      medicine[flagField] = true;

      await medicine.save();

      console.log(
        `Expiry notification sent -> ${medicine.medicineName} (${daysLeft} day(s) left)`
      );

    }

  } catch (error) {

    console.log(
      "Expiry Service Error:",
      error
    );

  }

};

module.exports =
  checkExpiryReminders;