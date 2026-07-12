// const cron = require("node-cron");

// const Medicine = require("../models/Medicine");
// const User = require("../models/User");

// const {
//   sendReminderEmail,
// } = require("../services/emailService");

// const {
//   sendPushNotification,
// } = require("../services/pushNotificationService");

// const startReminderScheduler = () => {
//   cron.schedule("* * * * *", async () => {
//     try {
//       // Indian Standard Time
//       const now = new Date(
//         new Date().toLocaleString("en-US", {
//           timeZone: "Asia/Kolkata",
//         })
//       );

//       const currentTime = `${String(now.getHours()).padStart(
//         2,
//         "0"
//       )}:${String(now.getMinutes()).padStart(2, "0")}`;

//       const today = new Date(now);
//       today.setHours(0, 0, 0, 0);

//       console.log(
//         `Checking Medicine Reminders... ${currentTime}`
//       );

//       const medicines = await Medicine.find();

//       for (const medicine of medicines) {
//         console.log("--------------------------------");
// console.log("Medicine:", medicine.medicineName);
// console.log("Reminder Times:", medicine.reminderTimes);
// console.log("Current Time:", currentTime);
// console.log("Start Date:", medicine.startDate);
// console.log("Duration:", medicine.duration);
//         // Skip if current reminder time doesn't match
//         if (
//   !medicine.reminderTimes ||
//   !medicine.reminderTimes.includes(currentTime)
// ) {
//   console.log("❌ Time does not match");
//   continue;
// }

// console.log("✅ Time matched");

//         // Medicine start date
//         const startDate = new Date(medicine.startDate);
//         startDate.setHours(0, 0, 0, 0);

//         // Medicine end date
//         const endDate = new Date(startDate);
//         endDate.setDate(
//           endDate.getDate() + Number(medicine.duration) - 1
//         );
//         endDate.setHours(23, 59, 59, 999);

//         // Skip if medicine is not currently active
//         if (today < startDate || today > endDate) {
//   console.log("❌ Medicine not active");
//   continue;
// }

// console.log("✅ Medicine is active");

//         const reminderKey = `${today.toDateString()}-${currentTime}`;

//         // Prevent duplicate reminders
//         if (
//           medicine.lastReminderSent === reminderKey
//         ) {
//           continue;
//         }

//         const user = await User.findById(
//           medicine.user
//         );

//         if (!user) continue;

//         // Email Reminder
//         if (user.emailReminders) {
//           console.log("📧 Sending email to:", user.email);
//           await sendReminderEmail(
//             user.email,
//             medicine.medicineName,
//             medicine.dosage
//           );
//         }

//         // Push Notification
//         if (
//           user.pushNotifications &&
//           user.fcmToken
//         ) {
//           await sendPushNotification(
//             user.fcmToken,
//             "Medicine Reminder 💊",
//             `Time to take ${medicine.medicineName} (${medicine.dosage})`
//           );
//         }

//         medicine.lastReminderSent = reminderKey;
//         await medicine.save();

//         console.log(
//           `✅ Reminder sent for ${medicine.medicineName}`
//         );
//       }
//     } catch (error) {
//       console.log(
//         "Reminder Scheduler Error:",
//         error
//       );
//     }
//   });
// };

// module.exports = startReminderScheduler;