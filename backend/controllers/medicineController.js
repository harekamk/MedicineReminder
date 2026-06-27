const Medicine = require("../models/Medicine");


// ADD MEDICINE
const addMedicine = async (req, res) => {

  try {

    const {
      medicineName,
      dosage,
      reminderTimes,
      startDate,
      duration,
      expiryDate,
    } = req.body;

    const medicine = await Medicine.create({

      user: req.user,

      medicineName,

      dosage,

      reminderTimes,

      startDate,

      duration,

      expiryDate,

      completedDoses: [],

      expiryNotified7Days: false,

      expiryNotifiedExpired: false,
    });

    res.status(201).json(medicine);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// GET ALL MEDICINES
const getMedicines = async (req, res) => {

  try {

    const medicines =
      await Medicine.find({

        user: req.user,

      }).sort({

        createdAt: -1,
      });

    res.status(200).json(medicines);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// DELETE MEDICINE
const deleteMedicine = async (req, res) => {

  try {

    const medicine =
      await Medicine.findOne({

        _id: req.params.id,

        user: req.user,
      });

    if (!medicine) {

      return res.status(404).json({

        message:
          "Medicine not found",
      });
    }

    await medicine.deleteOne();

    res.status(200).json({

      message:
        "Medicine Deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Server Error",
    });
  }
};


// UPDATE MEDICINE
const updateMedicine = async (req, res) => {

  try {

    const medicine =
      await Medicine.findOne({

        _id: req.params.id,

        user: req.user,
      });

    if (!medicine) {

      return res.status(404).json({

        message:
          "Medicine not found",
      });
    }

    medicine.medicineName =
      req.body.medicineName;

    medicine.dosage =
      req.body.dosage;

    medicine.reminderTimes =
      req.body.reminderTimes;

    medicine.startDate =
      req.body.startDate;

    medicine.duration =
      req.body.duration;

    medicine.expiryDate =
      req.body.expiryDate;

    // Reset notification flags
    medicine.expiryNotified7Days =
      false;

    medicine.expiryNotifiedExpired =
      false;

    await medicine.save();

    res.status(200).json(
      medicine
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Server Error",
    });
  }
};


// TOGGLE COMPLETE
const toggleCompleteMedicine =
  async (req, res) => {

    try {

      const medicine =
        await Medicine.findOne({

          _id: req.params.id,

          user: req.user,
        });

      if (!medicine) {

        return res.status(404).json({

          message:
            "Medicine not found",
        });
      }

      const date =
        req.body.date;

      if (
        !medicine.completedDoses
      ) {

        medicine.completedDoses =
          [];
      }

      const alreadyCompleted =
        medicine.completedDoses.includes(
          date
        );

      if (
        alreadyCompleted
      ) {

        medicine.completedDoses =
          medicine.completedDoses.filter(
            (d) =>
              d !== date
          );

      } else {

        medicine.completedDoses.push(
          date
        );
      }

      await medicine.save();

      res.status(200).json(
        medicine
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",
      });
    }
  };


module.exports = {

  addMedicine,

  getMedicines,

  deleteMedicine,

  updateMedicine,

  toggleCompleteMedicine,
};