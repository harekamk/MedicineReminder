import { initializeApp } from "firebase/app";

import {
  getMessaging,
  getToken,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCCqrCdvC2dAxRzcpR5PGgQ1EqkD3L_Blk",
  authDomain: "medicine-reminder-e05ee.firebaseapp.com",
  projectId: "medicine-reminder-e05ee",
  storageBucket:
    "medicine-reminder-e05ee.firebasestorage.app",
  messagingSenderId:
    "627214313135",
  appId:
    "1:627214313135:web:f025f52fac634f1571d65a",
};

const app =
  initializeApp(firebaseConfig);

export const messaging =
  getMessaging(app);

export const requestFCMToken =
  async () => {

    const permission =
      await Notification.requestPermission();

    if (
      permission !== "granted"
    ) {
      return null;
    }

    const token =
      await getToken(
        messaging,
        {
          vapidKey:
            "BMHYHuGVPwBzhwJNrDp9Ax88vZBjCmHziK16Mc8KYlPJXOGq9Aw6f3XfrY2sMqogtdbtqJHjBe8Rvk_URDqRewo",
        }
      );

    return token;
  };