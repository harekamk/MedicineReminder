require("dotenv").config();

const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;

client.authentications["api-key"].apiKey =
  process.env.BREVO_API_KEY;

const apiInstance =
  new SibApiV3Sdk.TransactionalEmailsApi();

const sendReminderEmail = async (
  email,
  medicineName,
  dosage
) => {
  try {
    console.log("📧 Sending reminder email to:", email);

    const result =
      await apiInstance.sendTransacEmail({
        sender: {
          name: "Medicine Reminder",
          email: "iamghazal.3746@gmail.com",
        },

        to: [
          {
            email: email,
          },
        ],

        subject: "💊 Medicine Reminder",

        htmlContent: `
          <h2>Medicine Reminder 💊</h2>

          <p>It's time to take your medicine.</p>

          <p><b>Medicine:</b> ${medicineName}</p>

          <p><b>Dosage:</b> ${dosage}</p>

          <br>

          <p>Stay Healthy ❤️</p>
        `,
      });

    console.log("✅ Email Sent");
    console.log(result);

    return true;

  } catch (error) {

    console.error("❌ Brevo Error");

    if (error.response) {
      console.error(error.response.body);
    } else {
      console.error(error);
    }

    return false;
  }
};

module.exports = {
  sendReminderEmail,
};