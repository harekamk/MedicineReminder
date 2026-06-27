const Medicine = require("../models/Medicine");

const checkExpiryReminders = async () => {

  try {

    const medicines =
      await Medicine.find();

    const today = new Date();

    for (const medicine of medicines) {

      if (!medicine.expiryDate)
        continue;

      const expiryDate =
        new Date(
          medicine.expiryDate
        );

      const daysLeft = Math.ceil(
        (
          expiryDate - today
        ) /
        (1000 * 60 * 60 * 24)
      );

      // 7 day reminder

      if (
        daysLeft <= 7 &&
        daysLeft > 0 &&
        !medicine.expiryNotified7Days
      ) {

        console.log(
          `⚠️ ${medicine.medicineName} expires in ${daysLeft} day(s)`
        );

        medicine.expiryNotified7Days =
          true;

        await medicine.save();
      }

      // expired reminder

      if (
        daysLeft <= 0 &&
        !medicine.expiryNotifiedExpired
      ) {

        console.log(
          `❌ ${medicine.medicineName} has expired`
        );

        medicine.expiryNotifiedExpired =
          true;

        await medicine.save();
      }

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