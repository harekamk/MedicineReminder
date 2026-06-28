import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import CalendarSection from "../components/CalendarSection";
import MedicineCard from "../components/MedicineCard";
import ExpiryAlerts from "../components/ExpiryAlerts";
import PharmacySection from "../components/PharmacySection";
import AddMedicineModal from "../components/AddMedicineModal";
// import AdherenceChart from "../components/AdherenceChart";

import API from "../services/api";
import toast from "react-hot-toast";
import {
  requestFCMToken
} from "../firebase";

function Dashboard() {

  const [medicines, setMedicines] = useState([]);

  const [selectedDate, setSelectedDate] =
    useState(
      new Date()
        .getDate()
        .toString()
    );

  const [showModal, setShowModal] =
    useState(false);

  const [editingMedicine, setEditingMedicine] =
    useState(null);

  const [formData, setFormData] =
    useState({
      medicineName: "",
      dosage: "",
      reminderTimes: [""],
      startDate: "",
      duration: "",
      expiryDate: "",
    });

  // FETCH MEDICINES

  const fetchMedicines = async () => {

    try {

      const res =
        await API.get("/medicines");

      setMedicines(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("Dashboard Loaded");
  fetchMedicines();
  const saveFCMToken = async () => {

  try {

    const token =
      await requestFCMToken();

    console.log("FCM TOKEN:", token);

    if (token) {

      await API.put(
        "/users/profile",
        {
          fcmToken: token,
        }
      );

      console.log(
        "FCM Token Saved"
      );

    }

  } catch (error) {

    console.log(
      "FCM Error:",
      error
    );

  }

};
  saveFCMToken();

  if ("Notification" in window) {

    Notification.requestPermission()
      .then((permission) => {

        if (permission === "granted") {

          new Notification(
            "Medicine Reminder Test",
            {
              body:
                "Notifications are working!"
            }
          );

        }

      });

  }

}, []);
useEffect(() => {

  if (
    Notification.permission !== "granted"
  ) return;

  medicines.forEach((medicine) => {

    const daysLeft = Math.ceil(
      (
        new Date(medicine.expiryDate) -
        new Date()
      ) /
      (1000 * 60 * 60 * 24)
    );

    if (daysLeft === 7) {

      new Notification(
        "Medicine Expiry Alert",
        {
          body: `${medicine.medicineName} expires in 7 days`
        }
      );

    }

  });

}, [medicines]);


  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // ADD OR UPDATE MEDICINE

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingMedicine) {

        await API.put(

          `/medicines/${editingMedicine._id}`,

          formData
        );

      } else {

        await API.post(
          "/medicines",
          formData
        );
      }

      setShowModal(false);

      setEditingMedicine(null);

      setFormData({
        medicineName: "",
        dosage: "",
        reminderTimes: [""],
        startDate: "",
        duration: "",
        expiryDate: "",
      });

      await fetchMedicines();
      toast.success(
  editingMedicine
    ? "Medicine Updated"
    : "Medicine Added"
);


    } catch (error) {

      console.log(error);

toast.error(
  "Failed To Save Medicine"
);
    }
  };

  // EDIT MEDICINE

  const editMedicine = (medicine) => {

    setEditingMedicine(medicine);

    setFormData({

      medicineName:
        medicine.medicineName,

      dosage:
        medicine.dosage,

      reminderTimes:
        medicine.reminderTimes || [""],

      startDate:
        medicine.startDate
          ?.split("T")[0] || "",

      duration:
        medicine.duration,

      expiryDate:
        medicine.expiryDate
          ?.split("T")[0] || "",
    });

    setShowModal(true);
  };

  // DELETE MEDICINE

  const deleteMedicine = async (id) => {

    try {

      await API.delete(
        `/medicines/${id}`
      );

      await fetchMedicines();
      toast.success(
  "Medicine Deleted"
);

    } catch (error) {

      console.log(error);
      toast.error(
  "Delete Failed"
);
    }
  };

  // TOGGLE COMPLETE

  const toggleComplete = async (id) => {

  try {

    const fullDate = `${new Date().getFullYear()}-${
      String(
        new Date().getMonth() + 1
      ).padStart(2, "0")
    }-${String(selectedDate).padStart(
      2,
      "0"
    )}`;

    await API.put(
      `/medicines/${id}/complete`,
      {
        date: fullDate,
      }
    );

    await fetchMedicines();

    toast.success(
      "Dose Marked Complete"
    );

  } catch (error) {

    console.log(error);

    toast.error(
      "Failed To Update Dose"
    );

  }
};

  // FILTER MEDICINES BY DATE

  const currentMonth =
    new Date().getMonth();

  const currentYear =
    new Date().getFullYear();

  const filteredMedicines =
    medicines.filter((medicine) => {

      if (
        !medicine.startDate ||
        !medicine.duration
      ) {
        return true;
      }

      const start =
        new Date(
          medicine.startDate
        );

      const end =
        new Date(
          medicine.startDate
        );

      end.setDate(
        end.getDate() +
        Number(
          medicine.duration
        ) - 1
      );

      const selected =
        new Date(
          currentYear,
          currentMonth,
          Number(selectedDate)
        );

      return (
        selected >= start &&
        selected <= end
      );
    });

  return (

    <div className="bg-[#f6f8fc] min-h-screen flex overflow-hidden">

      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden min-w-0">

        <Topbar />

        {showModal && (

          <AddMedicineModal
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            editingMedicine={
              editingMedicine
            }
            closeModal={() => {

              setShowModal(false);

              setEditingMedicine(null);
            }}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6">

          {/* LEFT */}

          <div className="min-w-0">

            <CalendarSection
              selectedDate={selectedDate}
              setSelectedDate={
                setSelectedDate
              }
              medicines={medicines}
            />

            <div className="mt-8">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-gray-800">

                  Today's Medicines

                </h2>

                <button
                  onClick={() =>
                    setShowModal(true)
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-md"
                >

                  + Add Medicine

                </button>

              </div>

              <div className="space-y-5">

                {filteredMedicines.length > 0 ? (

                  filteredMedicines.map(
                    (medicine) => (

                      <MedicineCard
                        key={
                          medicine._id
                        }
                        medicine={
                          medicine
                        }
                        selectedDate={
                          selectedDate
                        }
                        toggleComplete={
                          toggleComplete
                        }
                        editMedicine={
                          editMedicine
                        }
                        deleteMedicine={
                          deleteMedicine
                        }
                      />
                    )
                  )

                ) : (

                  <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">

                    <div className="text-6xl mb-5">

                      💊

                    </div>

                    <h2 className="text-2xl font-bold text-gray-700">

                      No Medicines Added

                    </h2>

                    <p className="text-gray-500 mt-3">

                      No medicines scheduled for this day.

                    </p>

                  </div>
                )}

              </div>

            </div>

            {/* <AdherenceChart
  medicines={medicines}
/> */}
<div className="mt-12 mb-4 flex flex-col items-center">
  <div className="h-px w-32 bg-gray-200 mb-4"></div>

  <p className="text-sm text-gray-500 font-medium">
    💙Stay healthy, stay consistent. 
  </p>

  <p className="text-xs text-gray-400 mt-1">
    Built with ❤️ by Harekam Kaur | harekamk@gmail.com
  </p>
</div>


          </div>

          {/* RIGHT */}

          <div className="w-full lg:w-[320px] shrink-0">

            <ExpiryAlerts
              medicines={medicines}
            />

           

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;