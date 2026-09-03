# 💊 Medicine Reminder and Expiry System

**Never miss a dose or forget an expiry date again!** 🩺✨

Medicine Reminder and Expiry System is a full-stack web application that helps users **manage medicines, schedule reminders, track expiry dates, receive notifications, and find nearby pharmacies** — all from one simple dashboard.

## 🔗 Links

🚀 **[Live Demo](https://medicine-reminder-frontend.netlify.app/)**
💻 **[GitHub Repository](https://github.com/harekamk/MedicineReminder)**

---

## 📖 About the Project

Keeping track of medicines, timings, dosages, and expiry dates can get difficult, especially when managing multiple medicines.

The **Medicine Reminder and Expiry System** makes medicine management easier by providing a single platform where users can:

* ⏰ Set reminders for medicines
* 💊 Manage their medicines and dosage details
* 📅 Track medicine expiry dates
* 🔔 Receive timely notifications
* 📸 Upload prescription or medicine images
* 📊 Monitor medicine intake through analytics
* 📍 Find nearby pharmacies
* 🗺️ View pharmacy locations on an interactive map

---

## ✨ Features

### 🔐 Secure Authentication

Sign up and log in securely using **JWT authentication** and password hashing.

### 💊 Medicine Management

Add, edit, view, and delete medicines along with their dosage, frequency, and timing.

### ⏰ Smart Medicine Reminders

Set medicine schedules and automatically receive reminders using scheduled background jobs.

### 📅 Medicine Expiry Tracking

Keep track of medicine expiry dates and get notified when medicines are close to expiring.

### 📧 Email Notifications

Receive medicine reminders through email using **Nodemailer**.

### 📱 SMS Notifications

Get important medicine reminders through SMS using **Twilio**.

### 🖼️ Prescription & Medicine Image Upload

Upload prescription or medicine images and store them securely using **Cloudinary**.

### 📍 Nearby Pharmacy Locator

Find nearby pharmacies using an interactive map powered by **Leaflet**.

### 📊 Analytics Dashboard

View charts and track your medicine intake and medication history using **Recharts**.

### 🔥 Firebase Integration

Firebase services are integrated for additional authentication and application functionality.

### 🎨 Responsive User Interface

A clean and responsive interface built with **React and Tailwind CSS** that works across different screen sizes.

---

## 🛠️ Tech Stack

### 🎨 Frontend

| Technology                  | Purpose                              |
| --------------------------- | ------------------------------------ |
| ⚛️ React 19                 | UI Library                           |
| ⚡ Vite                      | Frontend build tool                  |
| 🎨 Tailwind CSS             | Styling                              |
| 🧭 React Router DOM         | Navigation                           |
| 🗺️ Leaflet / React-Leaflet | Maps & pharmacy locator              |
| 📊 Recharts                 | Charts & analytics                   |
| 🔥 Firebase                 | Authentication & additional services |
| 🔔 React Hot Toast          | Notifications & toast messages       |
| 🧊 Lucide React             | Icons                                |

### ⚙️ Backend

| Technology             | Purpose                      |
| ---------------------- | ---------------------------- |
| 🟢 Node.js + Express 5 | Server & REST APIs           |
| 🍃 MongoDB + Mongoose  | Database                     |
| 🔑 JSON Web Token      | User authentication          |
| 🔒 bcryptjs            | Password hashing             |
| ⏱️ node-cron           | Scheduled medicine reminders |
| ✉️ Nodemailer          | Email notifications          |
| 📲 Twilio              | SMS notifications            |
| ☁️ Cloudinary + Multer | Image uploads                |
| 🔥 Firebase Admin      | Backend Firebase integration |

---

## 📁 Project Structure

```text
MedicineReminder/
│
├── 📁 backend/
│   ├── 📁 controllers/
│   ├── 📁 models/
│   ├── 📁 routes/
│   ├── 📁 middleware/
│   ├── 📁 services/
│   ├── 📁 config/
│   └── 📄 server.js
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   ├── 📁 pages/
│   │   ├── 📁 assets/
│   │   └── 📄 App.jsx
│   └── 📄 package.json
│
├── 📄 package.json
├── 📄 .gitignore
└── 📄 README.md
```

> 📌 The exact folders inside `backend` and `frontend` may vary depending on the current project structure.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### ✅ Prerequisites

Make sure you have the following installed:

* 🟢 [Node.js](https://nodejs.org/) — v18 or higher
* 🍃 [MongoDB](https://www.mongodb.com/) — Local MongoDB or MongoDB Atlas
* 📦 npm

---

### 📥 1. Clone the Repository

```bash
git clone https://github.com/harekamk/MedicineReminder.git
cd MedicineReminder
```

---

### ⚙️ 2. Backend Setup

Go to the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Email - Nodemailer
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password

# Twilio - SMS
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Firebase Admin
FIREBASE_PROJECT_ID=your_project_id
```

> ⚠️ **Important:** Never upload your actual `.env` file, passwords, API keys, or secret credentials to GitHub.

Start the backend server:

```bash
npm run dev
```

---

### 💻 3. Frontend Setup

Open a **new terminal** and move to the frontend folder:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

Your application should now be running locally. 🎉

Usually, the frontend will be available at:

```text
http://localhost:5173
```

---

## 🧪 How It Works

The application follows a simple workflow:

```text
👤 User
   │
   ▼
🔐 Sign Up / Login
   │
   ▼
💊 Add Medicine
   │
   ├── Dosage
   ├── Frequency
   ├── Reminder Time
   └── Expiry Date
   │
   ▼
⏰ Automated Scheduling
   │
   ▼
🔔 Reminder
   │
   ├── 📧 Email
   └── 📱 SMS
   │
   ▼
📊 Dashboard & Analytics
```

Users can also use the **📍 Nearby Pharmacy Locator** to find pharmacies around their location.

---

## 📸 Screenshots

> Add screenshots of your application here to make the repository more attractive to recruiters.

### 🏠 Dashboard

```md
![Dashboard](screenshots/dashboard.png)
```

### 💊 Medicine Management

```md
![Medicine Management](screenshots/medicine-management.png)
```

### ⏰ Medicine Reminders

```md
![Medicine Reminders](screenshots/reminders.png)
```

### 📍 Nearby Pharmacy Locator

```md
![Pharmacy Locator](screenshots/pharmacy-locator.png)
```

---

## 🎯 Future Improvements

Some features that can be added in future versions:

* 🤖 AI-based medicine assistance
* 📱 Dedicated mobile application
* 👨‍👩‍👧 Caregiver notifications
* 📈 Advanced medication insights and reports
* 🏥 Doctor / caregiver dashboard
* 💊 Medicine interaction information
* 🔔 More advanced notification options
* 🧠 Personalized medication insights

---

## 💖 Show Some Love

If you found this project useful or interesting, consider giving it a ⭐ on GitHub!

Your support is appreciated. 💙

---

## 👩‍💻 Author

### **Harekam Kaur**

💻 Computer Science Engineering Student
🚀 Full-Stack Developer | AI/ML Enthusiast

---

### ⭐ Project Links

🚀 **[Live Demo](https://medicine-reminder-frontend.netlify.app/)**

💻 **[View Source Code on GitHub](https://github.com/harekamk/MedicineReminder)**
