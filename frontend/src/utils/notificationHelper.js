export const requestNotificationPermission =
  async () => {

    if (!("Notification" in window)) {
      return;
    }

    if (
      Notification.permission !==
      "granted"
    ) {

      await Notification.requestPermission();

    }
  };

export const showNotification = (
  title,
  body
) => {

  if (
    Notification.permission ===
    "granted"
  ) {

    new Notification(title, {
      body,
      icon: "/medicine.png",
    });

  }
};