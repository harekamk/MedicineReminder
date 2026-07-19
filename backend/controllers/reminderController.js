const checkMedicineReminders = require("../services/checkMedicineReminders");
const checkExpiryReminders = require("../services/expiryReminderService");

const runReminderCheck = async (req, res) => {

  try {

    await checkMedicineReminders();

    await checkExpiryReminders();

    res.status(200).json({
      success: true,
      message: "Medicine reminder check completed successfully.",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Reminder check failed.",
    });

  }

};

module.exports = {
  runReminderCheck,
};