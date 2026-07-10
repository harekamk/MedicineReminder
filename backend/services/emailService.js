require("dotenv").config();
const nodemailer = require("nodemailer");

console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS =", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

transporter.verify((error) => {
  if (error) {
    console.error("❌ SMTP Verify Failed");
    console.error(error);
  } else {
    console.log("✅ SMTP Ready");
  }
});

const sendReminderEmail = async (
  email,
  medicineName,
  dosage
) => {
  try {
    console.log("====================================");
    console.log("📧 Sending Reminder Email");
    console.log("To:", email);
    console.log("Medicine:", medicineName);
    console.log("Dosage:", dosage);

    const info = await transporter.sendMail({
      from: `"Medicine Reminder" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "💊 Medicine Reminder",
      html: `
        <h2>Medicine Reminder</h2>
        <p>It's time to take your medicine.</p>

        <p>
          <strong>Medicine:</strong>
          ${medicineName}
        </p>

        <p>
          <strong>Dosage:</strong>
          ${dosage}
        </p>

        <br/>

        <p>Stay Healthy ❤️</p>
      `,
    });

    console.log("✅ Email Sent Successfully");
    console.log(info);

    transporter.close();

    return true;

  } catch (error) {

    console.error("❌ Email Sending Failed");

    console.error(error);

    return false;

  }
};

module.exports = {
  sendReminderEmail,
};