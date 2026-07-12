import { useEffect, useState } from "react";
import { getVehicles } from "../utils/vehicleApi";

const initialState = {
  vehicle: "",
  fuelType: "Diesel",
  quantity: "",
  cost: "",
  odometer: "",
  station: "",
  date: "",
  notes: "",
};

export default function FuelForm({
  selectedFuel,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(initialState);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    loadVehicles();

    if (selectedFuel) {
      setForm({
        vehicle: selectedFuel.vehicle?._id || "",
        fuelType: selectedFuel.fuelType || "Diesel",
        quantity: selectedFuel.quantity || "",
        cost: selectedFuel.cost || "",
        odometer: selectedFuel.odometer || "",
        station: selectedFuel.station || "",
        date: selectedFuel.date
          ? selectedFuel.date.substring(0, 10)
          : "",
        notes: selectedFuel.notes || "",
      });
    } else {
      setForm(initialState);
    }
  }, [selectedFuel]);

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

        {/* Fuel Type */}
        <div>
          <label className="block mb-1 font-medium">
            Fuel Type
          </label>

          <select
            name="fuelType"
            value={form.fuelType}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="CNG">CNG</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1 font-medium">
            Quantity (Litres)
          </label>

          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="50"
            required
          />
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
            placeholder="3500"
            required
          />
        </div>

        {/* Odometer */}
        <div>
          <label className="block mb-1 font-medium">
            Odometer (km)
          </label>

          <input
            type="number"
            name="odometer"
            value={form.odometer}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="45250"
            required
          />
        </div>

        {/* Fuel Station */}
        <div>
          <label className="block mb-1 font-medium">
            Fuel Station
          </label>

          <input
            type="text"
            name="station"
            value={form.station}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Indian Oil"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">
            Fuel Date
          </label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
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
          placeholder="Additional notes..."
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          {selectedFuel ? "Update Fuel" : "Add Fuel"}
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