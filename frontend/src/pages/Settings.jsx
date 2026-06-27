import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import API from "../services/api";
import toast from "react-hot-toast";

function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  
  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile");

      setName(res.data.name || "");
      setEmail(res.data.email || "");
      

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

    } catch (error) {
      console.log(error);
    }
  };
  // FETCH USER FROM MONGODB
  useEffect(() => {
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePic(reader.result);

      localStorage.setItem(
        "profilePic",
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  const saveSettings = async () => {
    try {
      const res = await API.put(
        "/users/profile",
        {
          name,
          email,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      toast.success("Settings Saved");

    } catch (error) {
      console.log(error);

      toast.error("Failed To Update Settings");
    }
  };

  return (
  <div className="bg-[#f6f8fc] min-h-screen flex">
    <Sidebar />

    <div className="flex-1 p-6">
      <Topbar />

      <div className="flex-1 flex justify-center p-6">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

          {/* HEADER */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-500 mt-2">
              Manage your account preferences
            </p>
          </div>

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center mb-10">
            {profilePic ? (
              <img
                src={profilePic}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold">
                {name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

            <label className="mt-4 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl">
              Upload Profile Picture
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* NAME */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl p-4"
            />
          </div>

          {/* EMAIL */}
          <div className="mb-8">
            <label className="block font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl p-4"
            />
          </div>

          {/* SAVE */}
          <button
            onClick={saveSettings}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg"
          >
            Save Changes
          </button>

          {/* 👇 MOVED HERE: ABOUT DEVELOPER */}
          <div className="border-t border-gray-100 pt-8 mt-10">

            <h3 className="text-xl font-bold text-gray-800 mb-2">
              About the Developer
            </h3>

            <p className="text-gray-500 mb-6">
              Making healthcare smarter, one reminder at a time 💊
            </p>

            <div className="bg-gray-50 rounded-2xl p-5">

              <h4 className="font-bold text-lg">
                Harekam Kaur
              </h4>

              <p className="text-gray-500">
                Full Stack Developer • React • UI/UX • AI Enthusiast
              </p>

              <div className="flex gap-5 mt-5 text-2xl">
                <a
                  href="https://linkedin.com/in/harekam-kaur-348849301"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:scale-110 transition"
                >
                  💼
                </a>

                <a
                  href="https://github.com/harekamk"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:scale-110 transition"
                >
                  🐙
                </a>

                <a href="mailto:harekamk@gmail.com" className="hover:scale-110 transition">
                  📧
                </a>
              </div>

              <p className="mt-5 text-sm italic text-gray-400">
                "Never miss a dose, never miss a moment."
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
);
}
export default Settings;