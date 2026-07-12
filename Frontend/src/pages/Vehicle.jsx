import { useEffect, useState } from "react";
import VehicleModal from "../components/VehicleModal";

import {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "../utils/vehicleApi";

export default function Vehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch Vehicles
  const fetchVehicles = async () => {
    try {
      const res = await getVehicles();
      setVehicles(res.data.vehicles || []);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Add / Update Vehicle
  const handleSubmit = async (data) => {
    try {
      if (selectedVehicle) {
        await updateVehicle(selectedVehicle._id, data);
      } else {
        await addVehicle(data);
      }

      setSelectedVehicle(null);
      setOpenModal(false);
      fetchVehicles();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Vehicle
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) return;

    try {
      await deleteVehicle(id);
      fetchVehicles();
    } catch (err) {
      console.error(err);
    }
  };

  // Search
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.vehicleNumber
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Fleet Management
          </h1>

          <p className="text-gray-500">
            Manage all your fleet vehicles.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedVehicle(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Vehicle
        </button>

      </div>

      {/* Search */}

      <div className="mb-5">

        <input
          type="text"
          placeholder="Search vehicle number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Vehicle No.</th>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Capacity</th>
              <th className="text-left p-4">Fuel</th>
              <th className="text-left p-4">Mileage</th>
              <th className="text-left p-4">Status</th>
              <th className="text-center p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredVehicles.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-500"
                >
                  No Vehicles Found
                </td>

              </tr>

            ) : (

              filteredVehicles.map((vehicle) => (

                <tr
                  key={vehicle._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4 font-medium">
                    {vehicle.vehicleNumber}
                  </td>

                  <td className="p-4">
                    {vehicle.vehicleType}
                  </td>

                  <td className="p-4">
                    {vehicle.capacity}
                  </td>

                  <td className="p-4">
                    {vehicle.fuelType}
                  </td>

                  <td className="p-4">
                    {vehicle.mileage}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        vehicle.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : vehicle.status === "On Trip"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {vehicle.status}
                    </span>

                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setOpenModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(vehicle._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Vehicle Modal */}

      <VehicleModal
        open={openModal}
        selectedVehicle={selectedVehicle}
        onSubmit={handleSubmit}
        onClose={() => {
          setSelectedVehicle(null);
          setOpenModal(false);
        }}
      />

    </div>
  );
}