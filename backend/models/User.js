const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
  type: String,
  default: "",
},
fcmToken: {
  type: String,
  default: "",
},

emailReminders: {
  type: Boolean,
  default: true,
},

pushNotifications: {
  type: Boolean,
  default: true,
},

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    darkMode: {
      type: Boolean,
      default: false,
    },

    smsReminders: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);