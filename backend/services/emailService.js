require("dotenv").config();
const nodemailer = require("nodemailer");
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS =", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS via STARTTLS

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  family: 4, // Force IPv4
});
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error);
  } else {
    console.log("✅ Email transporter is ready");
  }
});
const sendReminderEmail =
  async (
    email,
    medicineName,
    dosage
  ) => {

    try {
      console.log(
  "Attempting email to:",
  email
);

      await transporter.sendMail({
        from: process.env.EMAIL_USER,

        to: email,

        subject:
          "Medicine Reminder",

        html: `
          <h2>Medicine Reminder</h2>

          <p>
          Time to take
          <b>${medicineName}</b>
          </p>

          <p>
          Dosage:
          ${dosage}
          </p>
        `,
      });

      console.log(
        "Reminder email sent"
      );

    } catch (error) {

      console.log(error);

    }

  };

module.exports = {
  sendReminderEmail,
};