const express = require("express");

const router = express.Router();

const {
  runReminderCheck,
} = require("../controllers/reminderController");

// GET /api/reminders/run
router.get(
  "/run",
  runReminderCheck
);

module.exports = router;