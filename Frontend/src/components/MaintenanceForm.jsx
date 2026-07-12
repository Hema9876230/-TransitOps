import { useEffect, useState } from "react";
import { getVehicles } from "../utils/vehicleApi";

const initialState = {
  vehicle: "",
  serviceType: "Oil Change",
  cost: "",
  serviceDate: "",
  nextServiceDate: "",
  status: "Pending",
  notes: "",
};

export default function MaintenanceForm({
  selectedMaintenance,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(initialState);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    loadVehicles();

    if (selectedMaintenance) {
      setForm({
        vehicle: selectedMaintenance.vehicle?._id || "",
        serviceType: selectedMaintenance.serviceType || "Oil Change",
        cost: selectedMaintenance.cost || "",
        serviceDate: selectedMaintenance.serviceDate
          ? selectedMaintenance.serviceDate.substring(0, 10)
          : "",
        nextServiceDate: selectedMaintenance.nextServiceDate
          ? selectedMaintenance.nextServiceDate.substring(0, 10)
          : "",
        status: selectedMaintenance.status || "Pending",
        notes: selectedMaintenance.notes || "",
      });
    } else {
      setForm(initialState);
    }
  }, [selectedMaintenance]);

  const loadVehicles = async () => {
    try {
      const res = await getVehicles();
      setVehicles(res.data.vehicles || []);
    } catch (err) {
      console.error(err);
    }
  };

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

        {/* Vehicle */}

        <div>
          <label className="block mb-1 font-medium">
            Vehicle
          </label>

          <select
            name="vehicle"
            value={form.vehicle}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select Vehicle</option>

            {vehicles.map((vehicle) => (
              <option
                key={vehicle._id}
                value={vehicle._id}
              >
                {vehicle.vehicleNumber}
              </option>
            ))}
          </select>
        </div>

        {/* Service Type */}

        <div>
          <label className="block mb-1 font-medium">
            Service Type
          </label>

          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Oil Change</option>
            <option>Engine Service</option>
            <option>Brake Service</option>
            <option>Tyre Replacement</option>
            <option>Battery Replacement</option>
            <option>General Inspection</option>
          </select>
        </div>

        {/* Cost */}

        <div>
          <label className="block mb-1 font-medium">
            Cost (₹)
          </label>

          <input
            type="number"
            name="cost"
            value={form.cost}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* Service Date */}

        <div>
          <label className="block mb-1 font-medium">
            Service Date
          </label>

          <input
            type="date"
            name="serviceDate"
            value={form.serviceDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* Next Service Date */}

        <div>
          <label className="block mb-1 font-medium">
            Next Service Date
          </label>

          <input
            type="date"
            name="nextServiceDate"
            value={form.nextServiceDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* Status */}

        <div>
          <label className="block mb-1 font-medium">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

      </div>

      {/* Notes */}

      <div>

        <label className="block mb-1 font-medium">
          Notes
        </label>

        <textarea
          rows="4"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Enter maintenance notes..."
          className="w-full border rounded-lg p-3"
        />

      </div>

      {/* Buttons */}

      <div className="flex gap-3">

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          {selectedMaintenance
            ? "Update Maintenance"
            : "Add Maintenance"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
        >
          Cancel
        </button>

      </div>

    </form>
  );
}