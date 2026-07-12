import { useEffect, useState } from "react";

const initialState = {
  vehicleNumber: "",
  vehicleType: "Truck",
  capacity: "",
  fuelType: "Diesel",
  mileage: "",
  status: "Available",
};

export default function VehicleForm({
  onSubmit,
  selectedVehicle,
  onCancel,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (selectedVehicle) {
      setForm(selectedVehicle);
    } else {
      setForm(initialState);
    }
  }, [selectedVehicle]);

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
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-6 mb-6"
    >
      <div className="grid grid-cols-2 gap-4">

        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number"
          value={form.vehicleNumber}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <select
          name="vehicleType"
          value={form.vehicleType}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option>Truck</option>
          <option>Bus</option>
          <option>Van</option>
          <option>Car</option>
          <option>Bike</option>
        </select>

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <select
          name="fuelType"
          value={form.fuelType}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option>Diesel</option>
          <option>Petrol</option>
          <option>CNG</option>
          <option>Electric</option>
        </select>

        <input
          type="number"
          name="mileage"
          placeholder="Mileage"
          value={form.mileage}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option>Available</option>
          <option>On Trip</option>
          <option>Maintenance</option>
        </select>

      </div>

      <div className="mt-5 flex gap-3">

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
        >
          {selectedVehicle ? "Update Vehicle" : "Add Vehicle"}
        </button>

        {selectedVehicle && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-5 py-2 rounded"
          >
            Cancel
          </button>
        )}

      </div>
    </form>
  );
}