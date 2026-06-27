const {
  getMessaging,
} = require(
  "firebase-admin/messaging"
);

require("../config/firebaseAdmin");

const sendPushNotification =
  async (
    token,
    title,
    body
  ) => {

    try {

      console.log(
        "Sending notification to:",
        token
      );

      const message = {
        notification: {
          title,
          body,
        },
        token,
      };

      const response =
        await getMessaging()
          .send(message);

      console.log(
        "Push Notification Sent:",
        response
      );

    } catch (error) {

      console.log(
        "FCM Error:",
        error
      );

    }

  };

module.exports = {
  sendPushNotification,
};