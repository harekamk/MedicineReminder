import { useEffect } from "react";

function ExpiryAlerts({ medicines }) {

  const alerts = medicines
    .filter((medicine) => {

      if (!medicine.expiryDate) return false;

      const diff = Math.ceil(
        (
          new Date(medicine.expiryDate) -
          new Date()
        ) /
        (1000 * 60 * 60 * 24)
      );

      return diff <= 30;
    })

    .sort(
      (a, b) =>
        new Date(a.expiryDate) -
        new Date(b.expiryDate)
    );

  useEffect(() => {

    if (
      Notification.permission === "granted"
    ) {

      alerts.forEach((medicine) => {

        const diff = Math.ceil(
          (
            new Date(medicine.expiryDate) -
            new Date()
          ) /
          (1000 * 60 * 60 * 24)
        );

        if (
          diff > 0 &&
          diff <= 7
        ) {

          new Notification(
            "⚠️ Medicine Expiry Alert",
            {
              body: `${medicine.medicineName} expires in ${diff} day(s).`,
            }
          );
        }
      });
    }

  }, [medicines]);

  return (

    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

      <h2 className="text-xl font-bold text-gray-800 mb-6">

        ⚠️ Expiry Alerts

      </h2>

      <div className="space-y-4">

        {alerts.length > 0 ? (

          alerts.map((medicine) => {

            const diff = Math.ceil(
              (
                new Date(medicine.expiryDate) -
                new Date()
              ) /
              (1000 * 60 * 60 * 24)
            );

            let bgColor =
              "bg-green-50";

            let textColor =
              "text-green-600";

            let status =
              `${diff} days left`;

            if (diff <= 0) {

              bgColor =
                "bg-red-100";

              textColor =
                "text-red-600";

              status =
                "Expired";
            }

            else if (diff <= 7) {

              bgColor =
                "bg-red-50";

              textColor =
                "text-red-600";

              status =
                `${diff} days left`;
            }

            else if (diff <= 30) {

              bgColor =
                "bg-yellow-50";

              textColor =
                "text-yellow-600";

              status =
                `${diff} days left`;
            }

            return (

              <div
                key={medicine._id}
                className={`rounded-2xl p-4 ${bgColor}`}
              >

                <h3 className="font-bold text-gray-800">

                  {medicine.medicineName}

                </h3>

                <p
                  className={`${textColor} text-sm mt-2 font-semibold`}
                >

                  {status}

                </p>

                <p className="text-gray-500 text-xs mt-1">

                  Expiry:{" "}
                  {new Date(
                    medicine.expiryDate
                  ).toLocaleDateString()}

                </p>

              </div>
            );
          })

        ) : (

          <div className="bg-green-50 rounded-2xl p-5 text-center">

            <p className="text-green-600 font-semibold">

              No medicines expiring soon 🎉

            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default ExpiryAlerts;