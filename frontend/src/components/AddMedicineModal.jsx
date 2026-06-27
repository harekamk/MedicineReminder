import { X, Plus } from "lucide-react";

function AddMedicineModal({

  formData,
  handleChange,
  handleSubmit,
  closeModal,
  setFormData,

}) {

  const addReminder = () => {
  setFormData((prev) => ({
    ...prev,
    reminderTimes: [
      ...(prev.reminderTimes || []),
      "",
    ],
  }));
};

  const updateReminder = (
  index,
  value
) => {

  const updated = [
    ...(formData.reminderTimes || [])
  ];

  updated[index] = value;

  setFormData((prev) => ({
    ...prev,
    reminderTimes: updated,
  }));
};

  const removeReminder = (index) => {

  const updated =
    (formData.reminderTimes || []).filter(
      (_, i) => i !== index
    );

  setFormData((prev) => ({
    ...prev,
    reminderTimes:
      updated.length > 0
        ? updated
        : [""],
  }));
};

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-8 relative overflow-y-auto max-h-[90vh]">

        <button
          onClick={closeModal}
          className="absolute top-5 right-5"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-4 mb-8">

          <div className="bg-blue-100 p-4 rounded-2xl text-blue-500">

            <Plus size={28} />

          </div>

          <div>

            <h2 className="text-3xl font-bold">

              Add Medicine

            </h2>

            <p className="text-gray-500">

              Store reminders and expiry dates

            </p>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >

          <div>

            <label className="block mb-2">

              Medicine Name

            </label>

            <input
              type="text"
              name="medicineName"
              value={formData.medicineName}
              onChange={handleChange}
              className="w-full border p-4 rounded-2xl"
              required
            />

          </div>

          <div>

            <label className="block mb-2">

              Dosage

            </label>

            <input
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              className="w-full border p-4 rounded-2xl"
              required
            />

          </div>

          <div>

            <label className="block mb-2">

              Start Date

            </label>

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border p-4 rounded-2xl"
              required
            />

          </div>

          <div>

            <label className="block mb-2">

              Duration (Days)

            </label>

            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border p-4 rounded-2xl"
              required
            />

          </div>

          <div>

            <label className="block mb-2">

              Expiry Date

            </label>

            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full border p-4 rounded-2xl"
              required
            />

          </div>

          {/* MULTIPLE REMINDERS */}

          <div className="md:col-span-2">

            <label className="block mb-3 font-medium">

              Reminder Times

            </label>

            <div className="space-y-3">

              {(formData.reminderTimes || [""]).map(
                (time, index) => (

                  <div
                    key={index}
                    className="flex gap-3"
                  >

                    <input
                      type="time"
                      value={time}
                      onChange={(e) =>
                        updateReminder(
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 border p-4 rounded-2xl"
                    />

                    {(formData.reminderTimes?.length || 1) > 1 && (

                      <button
                        type="button"
                        onClick={() =>
                          removeReminder(index)
                        }
                        className="bg-red-100 px-4 rounded-2xl"
                      >

                        X

                      </button>

                    )}

                  </div>
                )
              )}

            </div>

            <button
              type="button"
              onClick={addReminder}
              className="mt-4 bg-blue-100 text-blue-600 px-5 py-2 rounded-xl"
            >

              + Add Reminder Time

            </button>

          </div>

          <button
            type="submit"
            className="md:col-span-2 bg-blue-500 text-white py-4 rounded-2xl font-bold"
          >

            Save Medicine

          </button>

        </form>

      </div>

    </div>
  );
}

export default AddMedicineModal;