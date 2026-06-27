import { Bell, LogOut } from "lucide-react";

function Navbar() {

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";
  };


  return (

    <div className="flex justify-between items-center mb-10">

      <div className="flex items-center gap-5">

        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-16 h-16 rounded-full"
        />


        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Hi, Julie Watson 👋
          </h1>

          <p className="text-gray-500 mt-1">
            Take care of your health today!
          </p>

        </div>

      </div>


      <div className="flex items-center gap-5">

        <button className="bg-white p-4 rounded-2xl shadow-md relative">

          <Bell size={22} />

          <div className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
            3
          </div>

        </button>


        <button
          onClick={logout}
          className="border border-red-400 text-red-500 px-6 py-4 rounded-2xl font-semibold flex items-center gap-3"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </div>
  );
}

export default Navbar;