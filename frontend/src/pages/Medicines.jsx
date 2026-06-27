import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import API from "../services/api";

function Medicines() {

  const [medicines, setMedicines] =
    useState([]);

  useEffect(() => {

    fetchMedicines();

  }, []);

  const fetchMedicines = async () => {

    try {

      const res =
        await API.get("/medicines");

      setMedicines(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="bg-[#f6f8fc] min-h-screen flex">

      <Sidebar />

      <div className="flex-1 p-6">

        <Topbar />

        <div className="bg-white rounded-3xl p-8 shadow-sm">

          <h1 className="text-3xl font-bold mb-6">

            💊 Medicines

          </h1>

          <div className="grid md:grid-cols-3 gap-5 mb-8">

            <div className="bg-blue-50 p-6 rounded-2xl">
              <h3 className="text-gray-500">
                Total Medicines
              </h3>

              <p className="text-3xl font-bold mt-2">
                {medicines.length}
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-2xl">
              <h3 className="text-gray-500">
                Active
              </h3>

              <p className="text-3xl font-bold mt-2">
                {
                  medicines.filter(
                    m =>
                      new Date(m.expiryDate) >
                      new Date()
                  ).length
                }
              </p>
            </div>

            <div className="bg-red-50 p-6 rounded-2xl">
              <h3 className="text-gray-500">
                Expired
              </h3>

              <p className="text-3xl font-bold mt-2">
                {
                  medicines.filter(
                    m =>
                      new Date(m.expiryDate) <=
                      new Date()
                  ).length
                }
              </p>
            </div>

          </div>

          <div className="space-y-4">

            {medicines.map((medicine) => (

              <div
                key={medicine._id}
                className="bg-gray-50 rounded-2xl p-5"
              >

                <h3 className="font-bold">

                  {medicine.medicineName}

                </h3>

                <p className="text-gray-500">

                  {medicine.dosage}

                </p>

                <p className="text-sm text-blue-500 mt-2">

                  Reminder:
                  {" "}
                  {medicine.reminderTimes?.join(", ")}

                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Medicines;