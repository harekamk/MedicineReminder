importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey:
    "AIzaSyCCqrCdvC2dAxRzcpR5PGgQ1EqkD3L_Blk",

  authDomain:
    "medicine-reminder-e05ee.firebaseapp.com",

  projectId:
    "medicine-reminder-e05ee",

  storageBucket:
    "medicine-reminder-e05ee.firebasestorage.app",

  messagingSenderId:
    "627214313135",

  appId:
    "1:627214313135:web:f025f52fac634f1571d65a",
});

const messaging =
  firebase.messaging();

messaging.onBackgroundMessage(
  (payload) => {

    self.registration.showNotification(
      payload.notification.title,
      {
        body:
          payload.notification.body,
      }
    );

  }
);