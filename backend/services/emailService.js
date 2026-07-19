require("dotenv").config();

const axios = require("axios");

const sendReminderEmail = async (
  email,
  medicineName,
  dosage
) => {
  try {
    console.log("📧 Sending reminder email to:", email);

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Medicine Reminder",
          email: "iamghazal.3746@gmail.com", // Your verified Brevo sender
        },

        to: [
          {
            email: email,
          },
        ],

        subject: "💊 Medicine Reminder",

        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding:20px;">

            <h2 style="color:#2563eb;">
              💊 Medicine Reminder
            </h2>

            <p>Hello,</p>

            <p>
              It's time to take your medicine.
            </p>

            <hr>

            <p>
              <strong>Medicine:</strong>
              ${medicineName}
            </p>

            <p>
              <strong>Dosage:</strong>
              ${dosage}
            </p>

            <br>

            <p>
              Stay Healthy ❤️
            </p>

          </div>
        `,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log("✅ Email Sent Successfully");
    console.log(response.data);

    return true;
  } catch (error) {
    console.log("❌ Brevo Email Error");

    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    return false;
  }
};

const sendExpiryEmail = async (
  email,
  medicineName,
  expiryDate,
  daysLeft
) => {
  try {
    console.log("📧 Sending expiry email to:", email);

    const subjectText =
      daysLeft <= 0
        ? "⚠️ Medicine Expired"
        : `⚠️ Medicine Expiring in ${daysLeft} day(s)`;

    const messageText =
      daysLeft <= 0
        ? "This medicine has expired today. Please stop using it and dispose of it safely."
        : `This medicine will expire in <strong>${daysLeft} day(s)</strong>. Please plan a refill or replacement.`;

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Medicine Reminder",
          email: "iamghazal.3746@gmail.com", // Your verified Brevo sender
        },

        to: [
          {
            email: email,
          },
        ],

        subject: subjectText,

        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding:20px;">

            <h2 style="color:#dc2626;">
              ${subjectText}
            </h2>

            <p>Hello,</p>

            <p>
              ${messageText}
            </p>

            <hr>

            <p>
              <strong>Medicine:</strong>
              ${medicineName}
            </p>

            <p>
              <strong>Expiry Date:</strong>
              ${expiryDate}
            </p>

            <br>

            <p>
              Stay Healthy ❤️
            </p>

          </div>
        `,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log("✅ Expiry Email Sent Successfully");
    console.log(response.data);

    return true;
  } catch (error) {
    console.log("❌ Brevo Expiry Email Error");

    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    return false;
  }
};

module.exports = {
  sendReminderEmail,
  sendExpiryEmail,
};