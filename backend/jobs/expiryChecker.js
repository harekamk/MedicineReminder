const cron = require("node-cron");
const Medicine = require("../models/Medicine");
const Alert = require("../models/Alert");

const startExpiryChecker = () => {

  cron.schedule(
    "0 9 * * *",
    async () => {

      console.log(
        "Checking expiry medicines..."
      );

      const medicines =
        await Medicine.find();

      const today =
        new Date();

      for (const medicine of medicines) {

        const expiry =
          new Date(
            medicine.expiryDate
          );

        const diffDays =
          Math.ceil(
            (expiry - today) /
            (1000 * 60 * 60 * 24)
          );

        if (
          diffDays <= 7 &&
          diffDays >= 0
        ) {

          const existingAlert =
            await Alert.findOne({

              medicine:
                medicine._id,

              message:
                `${medicine.medicineName} expires in ${diffDays} day(s)`

            });

          if (
            !existingAlert
          ) {

            await Alert.create({

              user:
                medicine.user,

              medicine:
                medicine._id,

              message:
                `${medicine.medicineName} expires in ${diffDays} day(s)`

            });

            console.log(
              `Alert created for ${medicine.medicineName}`
            );

          }

        }

      }

    }
  );

};

module.exports =
  startExpiryChecker;