require("dotenv").config();

const SibApiV3Sdk = require("sib-api-v3-sdk");

const defaultClient = SibApiV3Sdk.ApiClient.instance;

defaultClient.authentications["api-key"].apiKey =
  process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendReminderEmail = async (
  email,
  medicineName,
  dosage
) => {
  try {
    console.log("📧 Sending email to:", email);

    const result = await apiInstance.sendTransacEmail({
      sender: {
        email: "iamghazal.3746@gmail.com",
        name: "Medicine Reminder",
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

        <p><strong>Medicine:</strong> ${medicineName}</p>

        <p><strong>Dosage:</strong> ${dosage}</p>

        <br>

        <p>Stay Healthy ❤️</p>
      `,
    });

    console.log("✅ Email Sent Successfully");
    console.log(result);

    return true;

  } catch (error) {

    console.error("❌ Email Sending Failed");

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