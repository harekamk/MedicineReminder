require("dotenv").config();

const {
  sendReminderEmail,
} = require("./services/emailService");

sendReminderEmail(
  "iamghazal.3746@gmail.com",
  "Paracetamol",
  "1 Tablet"
);