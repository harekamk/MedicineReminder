import {
  LayoutDashboard,
  Pill,
  MapPin,
  Settings,
  BarChart3,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import { useSidebar } from "../context/useSidebar";
function Sidebar() {

  const location = useLocation();
  const { isOpen, setIsOpen } = useSidebar();


  const menus = [

    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },

    {
      name: "All Medicines",
      icon: <Pill size={20} />,
      path: "/medicines",
    },

    {
  name: "History",
  icon: <BarChart3 size={20} />,
  path: "/history",
},

    {
      name: "Pharmacies",
      icon: <MapPin size={20} />,
      path: "/pharmacies",
    },

    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];


  return (

    <>
  {isOpen && (
    <div
      className="fixed inset-0 bg-black/40 z-40 lg:hidden"
      onClick={() => setIsOpen(false)}
    />
  )}

  <div
    className={`fixed lg:sticky top-0 left-0 z-50 w-[260px] h-screen bg-white border-r border-gray-100 flex flex-col justify-between p-6 transform transition-transform duration-300 ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } lg:translate-x-0`}
  >

      <div>

        {/* LOGO */}

        <div className="flex items-center gap-3 mb-14">

          <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white font-bold text-xl">

            💊

          </div>

          <h1 className="text-2xl font-bold text-gray-800">

            MedReminder

          </h1>

        </div>


        {/* MENU */}

        <div className="space-y-3">

          {menus.map((menu, index) => (

            <Link
              key={index}
              to={menu.path}
              onClick={() => setIsOpen(false)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl font-semibold transition-all ${
                location.pathname === menu.path
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >

              {menu.icon}

              {menu.name}

            </Link>
          ))}

        </div>

      </div>


      {/* BOTTOM CARD */}

      <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl p-6 text-white">

        <div className="text-5xl mb-4">

          🔔

        </div>

        <h2 className="text-xl font-bold">

          Never miss a dose!

        </h2>

        <p className="text-sm text-blue-100 mt-2 leading-6">

          Get reminders before medicine time.

        </p>

      </div>
</div>
  </>
  );
}

export default Sidebar;
