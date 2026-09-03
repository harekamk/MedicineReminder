💊 MedicineReminder

**Never miss a dose again!** MedicineReminder is a full-stack web app that helps you keep track of your medicines, set up smart reminders, and stay on top of your health — all in one clean dashboard. 🩺✨

🔗 Links
[🚀 Live Demo](https://medicine-reminder-frontend.netlify.app/)
[💻 GitHub Repository](https://github.com/harekamk/MedicineReminder)

📖 About the Project

Keeping track of medicines, timings, and dosages can get messy — especially for families managing multiple prescriptions. **MedicineReminder** solves that by giving you:
- ⏰ Timely reminders so you never skip a dose
- 📊 A dashboard to visualize your medication history
- 🔔 Email & SMS alerts, so reminders reach you wherever you are
- 📸 The ability to upload prescriptions/medicine photos for easy reference

✨ Features

- 🔐 **Secure Authentication** — Sign up & log in safely with JWT + hashed passwords
- 💊 **Medicine Management** — Add, edit, and delete your medicines with ease
- ⏳ **Smart Scheduling** — Set dosage, frequency, and time using automated cron jobs
- 📧 **Email Reminders** — Get notified via email (Nodemailer)
- 🖼️ **Image Uploads** — Upload prescriptions or medicine images via Cloudinary
- 📍 **Location Support** — Interactive maps powered by Leaflet
- 📈 **Analytics Dashboard** — Visual charts of your medicine intake with Recharts
- 🔥 **Firebase Integration** — Extra layer of real-time features & auth support
- 🎨 **Clean, Responsive UI** — Built with React + Tailwind CSS for a smooth experience

🛠️ Tech Stack

### Frontend 🎨
| Technology | Purpose |
| ⚛️ React 19 | UI Library |
| ⚡ Vite | Lightning-fast build tool |
| 🎨 Tailwind CSS | Styling |
| 🧭 React Router DOM | Navigation |
| 🗺️ Leaflet / React-Leaflet | Maps |
| 📊 Recharts | Charts & analytics |
| 🔥 Firebase | Auth/real-time features |
| 🔥 React Hot Toast | Notifications/toasts |
| 🧊 Lucide React | Icons |

### Backend ⚙️
| Technology | Purpose |
| 🟢 Node.js + Express 5 | Server & REST API |
| 🍃 MongoDB + Mongoose | Database |
| 🔑 JSON Web Token | Authentication |
| 🔒 bcryptjs | Password hashing |
| ⏱️ node-cron | Scheduled reminders |
| ✉️ Nodemailer | Email notifications |
| 📲 Twilio | SMS notifications |
| ☁️ Cloudinary + Multer | Image uploads |
| 🔥 Firebase Admin | Backend Firebase integration |

## 📁 Project Structure
MedicineReminder/
├── backend/     # Express API, models, routes, cron jobs
├── frontend/    # React + Vite client app
└── package.json

🚀 Getting Started

✅ Prerequisites
Make sure you have installed:
- 🟢 [Node.js](https://nodejs.org/) (v18 or higher)
- 🍃 [MongoDB](https://www.mongodb.com/) (local or Atlas connection string)

📥 1. Clone the Repository
```bash
git clone https://github.com/harekamk/MedicineReminder.git
cd MedicineReminder
```
⚙️ 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file inside `backend/` with values like:
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
# Email (Nodemailer)
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
# Firebase Admin
FIREBASE_PROJECT_ID=your_project_id

Run the backend server:
```bash
npm run dev
```

💻 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Your app should now be running locally! 🎉 Visit the URL shown in your terminal (usually `http://localhost:5173`).

🧪 How It Works
1. 📝 **Sign up / Log in** to your account
2. ➕ **Add your medicines** with dosage, time, and frequency
3. ⏰ The app **schedules reminders** automatically using cron jobs
4. 📩 You get notified via **email** right on time
5. 📊 Track your progress on the **analytics dashboard**

🎯 Future Improvements
Some features that can be added in the future:
- 🤖 AI-based medicine assistance
- 📱 Mobile application
- 👨‍👩‍👧 Caregiver notifications
- 📈 Medicine adherence analytics
- 🏥 Doctor/caregiver dashboard
- 🔔 More advanced notification options like SMS

💖 Show Some Love
If you found this project helpful, please consider giving it a ⭐!

👩‍💻 Author
**Harekam Kaur**
- 💻 Computer Science Engineering Student
- 🚀 Full-Stack Developer | AI/ML Enthusiast
