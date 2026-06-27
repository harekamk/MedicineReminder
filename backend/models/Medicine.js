const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    medicineName: {
      type: String,
      required: true,
    },

    dosage: {
      type: String,
      required: true,
    },

    reminderTimes: {
      type: [String],
      default: [],
      required: true,
    },

    startDate: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    expiryDate: {
      type: String,
      required: true,
    },

    completedDoses: {
      type: [String],
      default: [],
    },

    completedDates: {
      type: [Date],
      default: [],
    },
    lastReminderSent: {
  type: String,
  default: "",
},
    expiryNotified7Days: {
  type: Boolean,
  default: false,
},

expiryNotifiedExpired: {
  type: Boolean,
  default: false,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Medicine",
  medicineSchema
);