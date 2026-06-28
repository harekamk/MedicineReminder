import {
  LogOut,
  Menu,
} from "lucide-react";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSidebar } from "../context/useSidebar";

function Topbar() {

  const [time, setTime] =
    useState(new Date());

  const [user, setUser] =
    useState(
      JSON.parse(
        localStorage.getItem("user")
      ) || {}
    );

  const [profilePic, setProfilePic] =
    useState(
      localStorage.getItem("profilePic")
    );
  const { setIsOpen } = useSidebar();

  useEffect(() => {

    const interval = setInterval(() => {

      setTime(new Date());

    }, 1000);

    return () =>
      clearInterval(interval);

  }, []);

  useEffect(() => {

    const syncUser = () => {

      const updatedUser =
        JSON.parse(
          localStorage.getItem("user")
        ) || {};

      setUser(updatedUser);

      setProfilePic(
        localStorage.getItem(
          "profilePic"
        )
      );
    };

    window.addEventListener(
      "storage",
      syncUser
    );

    window.addEventListener(
      "focus",
      syncUser
    );

    return () => {

      window.removeEventListener(
        "storage",
        syncUser
      );

      window.removeEventListener(
        "focus",
        syncUser
      );
    };

  }, []);

  const logoutHandler = () => {

    toast.success("Logged Out");

setTimeout(() => {

  localStorage.clear();

  window.location.href = "/";

}, 1000);
  };

  const userName =
    user?.name || "User";

  return (

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

      {/* LEFT */}

      <div className="flex items-center gap-4">

        <button
  onClick={() => setIsOpen(true)}
  className="lg:hidden bg-white p-3 rounded-2xl border border-gray-100"
>
  <Menu size={22} />
</button>

        {/* PROFILE */}

        {profilePic ? (

          <img
            src={profilePic}
            alt="profile"
            className="w-14 h-14 rounded-2xl object-cover shadow-md"
          />

        ) : (

          <div className="w-14 h-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-xl font-bold shadow-md">

            {userName.charAt(0).toUpperCase()}

          </div>

        )}

        <div>

          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">

            Hi, {userName} 👋

          </h1>

          <p className="text-gray-500 text-sm lg:text-base">

            Stay healthy and hydrated today

          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex flex-wrap items-center gap-4">

        <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100">

          <p className="text-gray-500 text-sm">

            {time.toDateString()}

          </p>

          <h3 className="font-bold text-gray-800 mt-1">

            {time.toLocaleTimeString()}

          </h3>

        </div>

        <button
          onClick={logoutHandler}
          className="border border-red-200 text-red-500 px-5 py-4 rounded-2xl flex items-center gap-2 font-semibold hover:bg-red-50 transition"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </div>
  );
}

export default Topbar;