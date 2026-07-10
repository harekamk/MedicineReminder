require("dotenv").config();

const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendReminderEmail = async (
  email,
  medicineName,
  dosage
) => {
  try {
    console.log("📧 Sending reminder email to:", email);

    const sendSmtpEmail = {
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
        <html>
          <body style="font-family:Arial,sans-serif">

            <h2>💊 Medicine Reminder</h2>

            <p>Hello,</p>

            <p>It's time to take your medicine.</p>

            <p>
              <b>Medicine:</b>
              ${medicineName}
            </p>

            <p>
              <b>Dosage:</b>
              ${dosage}
            </p>

            <br>

            <p>
              Stay Healthy ❤️
            </p>

          </body>
        </html>
      `,
    };

    const response =
      await apiInstance.sendTransacEmail(
        sendSmtpEmail
      );

    console.log(
      "✅ Email sent successfully"
    );

    console.log(response.body);

    return true;

  } catch (error) {

    console.log(
      "❌ Brevo Email Error"
    );

    if (error.response) {

      console.log(error.response.body);

    } else {

      console.log(error);

    }

    return false;
  }
};

module.exports = {
  sendReminderEmail,
};