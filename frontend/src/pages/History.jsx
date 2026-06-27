import { useEffect, useState } from "react";
import API from "../services/api";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
} from "recharts";

function History() {
const [medicines, setMedicines] = useState([]);

useEffect(() => {
fetchMedicines();
}, []);

const fetchMedicines = async () => {
try {
const res = await API.get("/medicines");
setMedicines(res.data);
} catch (error) {
console.log(error);
}
};

let totalScheduled = 0;
let totalTaken = 0;
let totalMissed = 0;

const today = new Date();

medicines.forEach((medicine) => {
const reminders =
medicine.reminderTimes?.length || 1;


const duration =
  Number(medicine.duration) || 0;

const startDate = new Date(
  medicine.startDate
);

for (let i = 0; i < duration; i++) {
  const doseDate = new Date(startDate);

  doseDate.setDate(
    doseDate.getDate() + i
  );

  totalScheduled += reminders;

  if (
    doseDate <
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )
  ) {
    const dateString =
      doseDate.toISOString().split("T")[0];

    const completed =
      medicine.completedDoses?.includes(
        dateString
      );

    if (completed) {
      totalTaken += reminders;
    } else {
      totalMissed += reminders;
    }
  }
}


});

const last7Days = [];

for (let i = 6; i >= 0; i--) {
const date = new Date();


date.setDate(
  date.getDate() - i
);

const dateString =
  date.toISOString().split("T")[0];

let taken = 0;

medicines.forEach((medicine) => {
  if (
    medicine.completedDoses?.includes(
      dateString
    )
  ) {
    taken++;
  }
});

last7Days.push({
  day: date.toLocaleDateString(
    "en-US",
    {
      weekday: "short",
    }
  ),
  taken,
});


}

return ( <div className="bg-[#f6f8fc] min-h-screen flex"> <Sidebar />

  <div className="flex-1 p-6">
    <Topbar />

    <h1 className="text-3xl font-bold mb-8">
      📊 Medicine History
    </h1>

    <div className="grid md:grid-cols-3 gap-5 mb-8">
      <div className="bg-white rounded-3xl p-6 shadow">
        <h4 className="text-gray-500">
          Scheduled Doses
        </h4>

        <h2 className="text-4xl font-bold text-purple-600 mt-2">
          {totalScheduled}
        </h2>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow">
        <h4 className="text-gray-500">
          Taken
        </h4>

        <h2 className="text-4xl font-bold text-green-600 mt-2">
          {totalTaken}
        </h2>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow">
        <h4 className="text-gray-500">
          Missed
        </h4>

        <h2 className="text-4xl font-bold text-red-500 mt-2">
          {totalMissed}
        </h2>
      </div>
    </div>

    <div className="bg-white rounded-3xl p-8 shadow">
      <h2 className="text-xl font-bold mb-6">
        Weekly Medicine Activity
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={last7Days}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="taken"
            fill="#3B82F6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>


);
}

export default History;
