const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const userRoutes = require("./routes/userRoutes");

const startExpiryChecker = require("./jobs/expiryChecker");
const alertRoutes = require("./routes/alertRoutes");
const cron = require("node-cron");

const checkExpiryReminders = require("./services/expiryReminderService");
const startReminderScheduler = require("./jobs/reminderScheduler");
const pharmacyRoutes = require("./routes/pharmacyRoutes");
// const checkMedicineReminders =
// require("./services/reminderScheduler");

require("dotenv").config();

connectDB();

cron.schedule(
  "0 * * * *",
  async () => {

    console.log(
      "Running Expiry Check..."
    );

    await checkExpiryReminders();

  }
);
// cron.schedule(
//   "* * * * *",
//   async () => {

//     console.log(
//       "Checking Medicine Reminders..."
//     );

//     await checkMedicineReminders();

//   }
// );

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(
  "/api/medicines",
  medicineRoutes
);

app.use(
  "/api/users",
  userRoutes
);
app.use(
  "/api/alerts",
  alertRoutes
);
app.use(
  "/api/pharmacies",
  pharmacyRoutes
);
app.get("/", (req, res) => {

  res.send(
    "MedReminder Backend Running"
  );

});

/*
  START EXPIRY CHECKER
*/

startExpiryChecker();
startReminderScheduler();

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});