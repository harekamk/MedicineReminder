import { useMemo } from "react";

function CalendarSection({
  selectedDate,
  setSelectedDate,
  medicines = [],
}) {
  const today = new Date();

  const currentMonth = today.toLocaleString(
    "default",
    {
      month: "long",
    }
  );

  const currentYear =
    today.getFullYear();

  const currentDate =
    today.getDate().toString();

  const daysInMonth = new Date(
    currentYear,
    today.getMonth() + 1,
    0
  ).getDate();

  const dates = useMemo(() => {
    return Array.from(
      { length: daysInMonth },
      (_, i) => i + 1
    );
  }, [daysInMonth]);

  const getDotColor = (date) => {
    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date
    ).padStart(2, "0");

    const fullDate =
      currentYear +
      "-" +
      month +
      "-" +
      day;

    const dayDate = new Date(
      currentYear,
      today.getMonth(),
      date
    );

    const todayDate = new Date(
      currentYear,
      today.getMonth(),
      today.getDate()
    );

    const medicinesForDay =
      medicines.filter(
        (medicine) => {
          if (
            !medicine.startDate ||
            !medicine.duration
          ) {
            return false;
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
              ) -
              1
          );

          return (
            dayDate >= start &&
            dayDate <= end
          );
        }
      );

    if (
      medicinesForDay.length === 0
    ) {
      return "bg-gray-300";
    }

    if (
      dayDate > todayDate
    ) {
      return "bg-blue-500";
    }

    const allCompleted =
      medicinesForDay.every(
        (medicine) =>
          medicine.completedDoses?.includes(
            fullDate
          )
      );

    return allCompleted
      ? "bg-green-500"
      : "bg-red-500";
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {currentMonth}
          </h2>

          <p className="text-gray-500">
            {currentYear}
          </p>
        </div>

        <button
          onClick={() =>
            setSelectedDate(
              currentDate
            )
          }
          className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl font-medium hover:bg-blue-200 transition-all"
        >
          Today
        </button>
      </div>

      {/* DATE STRIP */}

      <div className="flex gap-3 overflow-x-auto pb-3">
        {dates.map((date) => {
          const dateObj =
            new Date(
              currentYear,
              today.getMonth(),
              date
            );

          const dayName =
            dateObj
              .toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                }
              )
              .toUpperCase();

          const isSelected =
            selectedDate ===
            date.toString();

          const isToday =
            currentDate ===
            date.toString();

          return (
            <div
              key={date}
              onClick={() =>
                setSelectedDate(
                  date.toString()
                )
              }
              className={`min-w-[72px] cursor-pointer rounded-2xl px-3 py-4 text-center transition-all duration-300 ${
                isSelected
                  ? "bg-blue-500 text-white shadow-lg scale-105"
                  : isToday
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-50 hover:bg-blue-50"
              }`}
            >
              <h2 className="text-xl font-bold">
                {date}
              </h2>

              <p
                className={`text-xs mt-1 font-medium ${
                  isSelected
                    ? "text-white"
                    : "text-gray-500"
                }`}
              >
                {dayName}
              </p>

              <div
                className={`w-2 h-2 rounded-full mx-auto mt-3 ${
                  isSelected
                    ? "bg-white"
                    : getDotColor(
                        date
                      )
                }`}
              ></div>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}

      <div className="mt-5 flex gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>

          <p className="text-sm text-gray-500">
            Completed
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>

          <p className="text-sm text-gray-500">
            Missed
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>

          <p className="text-sm text-gray-500">
            Upcoming
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>

          <p className="text-sm text-gray-500">
            No Medicines
          </p>
        </div>
      </div>
    </div>
  );
}

export default CalendarSection;