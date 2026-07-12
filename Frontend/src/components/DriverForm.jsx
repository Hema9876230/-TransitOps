import { useEffect, useState } from "react";

const initialState = {
  name: "",
  phone: "",
  licenseNumber: "",
  experience: "",
  status: "Available",
};

export default function DriverForm({
  onSubmit,
  selectedDriver,
  onCancel,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (selectedDriver) {
      setForm({
        name: selectedDriver.name || "",
        phone: selectedDriver.phone || "",
        licenseNumber: selectedDriver.licenseNumber || "",
        experience: selectedDriver.experience || "",
        status: selectedDriver.status || "Available",
      });
    } else {
      setForm(initialState);
    }
  }, [selectedDriver]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium mb-1">
            Driver Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter Driver Name"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="9876543210"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            License Number
          </label>

          <input
            type="text"
            name="licenseNumber"
            value={form.licenseNumber}
            onChange={handleChange}
            placeholder="DL123456789"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Experience (Years)
          </label>

          <input
            type="number"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            min="0"
            placeholder="5"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          >
            <option value="Available">Available</option>
            <option value="On Trip">On Trip</option>
            <option value="Off Duty">Off Duty</option>
          </select>
        </div>

      </div>

      <div className="flex gap-3">

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          {selectedDriver ? "Update Driver" : "Add Driver"}
        </button>

        {selectedDriver && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        )}

      </div>

    </form>
  );
}