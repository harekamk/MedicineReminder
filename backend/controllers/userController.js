const User = require("../models/User");

const getProfile = async (req, res) => {

  try {

    const user =
      await User.findById(req.user)
      .select("-password");

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

};

const updateProfile = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(req.user);

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    user.name =
      req.body.name || user.name;

    user.email =
      req.body.email || user.email;

    user.phoneNumber =
      req.body.phoneNumber ||
      user.phoneNumber;

    user.darkMode =
      req.body.darkMode;

    user.smsReminders =
      req.body.smsReminders;

    user.emailReminders =
      req.body.emailReminders ??
      user.emailReminders;

    user.pushNotifications =
      req.body.pushNotifications ??
      user.pushNotifications;

    user.fcmToken =
      req.body.fcmToken ||
      user.fcmToken;

    await user.save();

    res.json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

module.exports = {
  getProfile,
  updateProfile,
};