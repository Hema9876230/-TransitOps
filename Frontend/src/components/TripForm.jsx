import { useEffect, useState } from "react";
import { getVehicles } from "../utils/vehicleApi";
import { getDrivers } from "../utils/driverApi";

const initialState = {
  vehicle: "",
  driver: "",
  source: "",
  destination: "",
  distance: "",
  status: "Scheduled",
};

export default function TripForm({
  selectedTrip,
  onSubmit,
  onCancel,
}) {

  const [form, setForm] = useState(initialState);

  const [vehicles, setVehicles] = useState([]);

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {

    loadData();

    if (selectedTrip) {
      setForm({
        vehicle: selectedTrip.vehicle._id,
        driver: selectedTrip.driver._id,
        source: selectedTrip.source,
        destination: selectedTrip.destination,
        distance: selectedTrip.distance,
        status: selectedTrip.status,
      });
    }

  }, [selectedTrip]);

  const loadData = async () => {

    const vehicleRes = await getVehicles();

    const driverRes = await getDrivers();

    setVehicles(
      vehicleRes.data.vehicles.filter(
        (v) => v.status === "Available"
      )
    );

    setDrivers(
      driverRes.data.drivers.filter(
        (d) => d.status === "Available"
      )
    );

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

    <form onSubmit={handleSubmit} className="space-y-4">

      <select
        name="vehicle"
        value={form.vehicle}
        onChange={handleChange}
        className="w-full border rounded p-3"
      >

        <option value="">Select Vehicle</option>

        {vehicles.map((v) => (

          <option key={v._id} value={v._id}>
            {v.vehicleNumber}
          </option>

        ))}

      </select>

      <select
        name="driver"
        value={form.driver}
        onChange={handleChange}
        className="w-full border rounded p-3"
      >

        <option value="">Select Driver</option>

        {drivers.map((d) => (

          <option key={d._id} value={d._id}>
            {d.name}
          </option>

        ))}

      </select>

      <input
        name="source"
        placeholder="Source"
        value={form.source}
        onChange={handleChange}
        className="w-full border rounded p-3"
      />

      <input
        name="destination"
        placeholder="Destination"
        value={form.destination}
        onChange={handleChange}
        className="w-full border rounded p-3"
      />

      <input
        type="number"
        name="distance"
        placeholder="Distance"
        value={form.distance}
        onChange={handleChange}
        className="w-full border rounded p-3"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border rounded p-3"
      >

        <option>Scheduled</option>
        <option>In Transit</option>
        <option>Completed</option>
        <option>Cancelled</option>

      </select>

      <div className="flex gap-3">

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {selectedTrip ? "Update Trip" : "Create Trip"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-6 py-2 rounded"
        >
          Cancel
        </button>

      </div>

    </form>

  );
}