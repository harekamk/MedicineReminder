import {
  Clock3,
  Trash2,
  Pencil,
} from "lucide-react";

function MedicineCard({

  medicine,
  toggleComplete,
  selectedDate,
  editMedicine,
  deleteMedicine,

}) {

  const fullDate = `${new Date().getFullYear()}-${
  String(new Date().getMonth() + 1).padStart(2, "0")
}-${String(selectedDate).padStart(2, "0")}`;

  const completed =
    medicine.completedDoses?.includes(
      fullDate
    );

  const expiryDiff = Math.ceil(

    (new Date(medicine.expiryDate) -
      new Date()) /

    (1000 * 60 * 60 * 24)
  );

  let status = "Safe";

  let statusColor =
    "bg-green-100 text-green-600";

  if (
    expiryDiff <= 7 &&
    expiryDiff > 0
  ) {

    status =
      `Expiring in ${expiryDiff} days`;

    statusColor =
      "bg-red-100 text-red-500";
  }

  if (
    expiryDiff <= 30 &&
    expiryDiff > 7
  ) {

    status = "Expiring Soon";

    statusColor =
      "bg-yellow-100 text-yellow-600";
  }

  if (expiryDiff <= 0) {

    status = "Expired";

    statusColor =
      "bg-red-100 text-red-500";
  }

  return (

    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">

      {/* LEFT */}

      <div className="flex items-center gap-5">

        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">

          💊

        </div>

        <div>

          <h2
            className={`text-xl font-bold ${
              completed
                ? "line-through text-gray-400"
                : "text-gray-800"
            }`}
          >

            {medicine.medicineName}

          </h2>

          <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">

            <div className="flex items-center gap-2">

              <Clock3 size={15} />

              {medicine.reminderTimes?.join(" • ")}

            </div>

            <span>•</span>

            <span>

              {medicine.dosage}

            </span>

          </div>

          <div className="mt-3 flex items-center gap-4">

            <div
              className={`${statusColor} px-3 py-1 rounded-xl text-sm font-semibold`}
            >

              {status}

            </div>

            <p className="text-gray-400 text-sm">

              Exp:{" "}
              {new Date(
                medicine.expiryDate
              ).toLocaleDateString()}

            </p>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-4">

        <input
          type="checkbox"
          checked={completed}
          onChange={() =>
            toggleComplete(
              medicine._id
            )
          }
          className="w-6 h-6 accent-blue-500 cursor-pointer"
        />

        <div className="flex gap-2">

          <button
            onClick={() =>
              editMedicine(
                medicine
              )
            }
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600 p-2 rounded-xl transition"
          >

            <Pencil size={18} />

          </button>

          <button
            onClick={() =>
              deleteMedicine(
                medicine._id
              )
            }
            className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-xl transition"
          >

            <Trash2 size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}

export default MedicineCard;