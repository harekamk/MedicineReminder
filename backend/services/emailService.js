require("dotenv").config();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendReminderEmail = async (
  email,
  medicineName,
  dosage
) => {
  try {
    console.log("📧 Sending email to:", email);

    const { data, error } = await resend.emails.send({
      from: "Medicine Reminder <onboarding@resend.dev>",
      to: email,
      subject: "💊 Medicine Reminder",
      html: `
        <h2>Medicine Reminder 💊</h2>

        <p>It's time to take your medicine.</p>

        <p><strong>Medicine:</strong> ${medicineName}</p>

        <p><strong>Dosage:</strong> ${dosage}</p>

        <br/>

        <p>Stay Healthy ❤️</p>
      `,
    });

    if (error) {
      console.error("❌ Resend Error:", error);
      return false;
    }

    console.log("✅ Email Sent Successfully");
    console.log(data);

    return true;

  } catch (err) {

    console.error("❌ Email Sending Failed");
    console.error(err);

    return false;
  }
};

module.exports = {
  sendReminderEmail,
};