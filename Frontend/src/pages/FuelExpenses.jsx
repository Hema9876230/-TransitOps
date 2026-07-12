import { useEffect, useState } from "react";
import FuelModal from "../components/FuelModal";

import {
  getFuels,
  addFuel,
  updateFuel,
  deleteFuel,
} from "../utils/fuelApi";

export default function FuelExpenses() {
  const [fuels, setFuels] = useState([]);
  const [selectedFuel, setSelectedFuel] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const fetchFuels = async () => {
    try {
      const res = await getFuels();
      setFuels(res.data.fuels || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFuels();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (selectedFuel) {
        await updateFuel(selectedFuel._id, data);
      } else {
        await addFuel(data);
      }

      setSelectedFuel(null);
      setOpenModal(false);
      fetchFuels();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this fuel record?")) return;

    try {
      await deleteFuel(id);
      fetchFuels();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredFuel = fuels.filter((fuel) => {
    const vehicle = fuel.vehicle?.vehicleNumber || "";
    const station = fuel.station || "";

    return (
      vehicle.toLowerCase().includes(search.toLowerCase()) ||
      station.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalCost = fuels.reduce(
    (sum, item) => sum + Number(item.cost || 0),
    0
  );

  const totalFuel = fuels.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Fuel & Expenses
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            Track fuel consumption and expenses
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedFuel(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Fuel Entry
        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">

          <h2 className="text-gray-500">
            Total Fuel
          </h2>

          <p className="text-3xl font-bold mt-2">
            {totalFuel.toFixed(2)} L
          </p>

        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">

          <h2 className="text-gray-500">
            Total Fuel Cost
          </h2>

          <p className="text-3xl font-bold mt-2">
            ₹{totalCost.toLocaleString()}
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="mb-5">

        <input
          type="text"
          placeholder="Search Vehicle or Station..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-80"
        />

      </div>

      {/* Table */}

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 dark:bg-gray-800">

            <tr>

              <th className="p-4 text-left">Vehicle</th>

              <th className="p-4 text-left">Fuel</th>

              <th className="p-4 text-left">Quantity</th>

              <th className="p-4 text-left">Cost</th>

              <th className="p-4 text-left">Odometer</th>

              <th className="p-4 text-left">Station</th>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredFuel.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-8 text-gray-500"
                >
                  No Fuel Records Found
                </td>

              </tr>

            ) : (

              filteredFuel.map((fuel) => (

                <tr
                  key={fuel._id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-800"
                >

                  <td className="p-4">
                    {fuel.vehicle?.vehicleNumber}
                  </td>

                  <td className="p-4">
                    {fuel.fuelType}
                  </td>

                  <td className="p-4">
                    {fuel.quantity} L
                  </td>

                  <td className="p-4">
                    ₹{fuel.cost}
                  </td>

                  <td className="p-4">
                    {fuel.odometer} km
                  </td>

                  <td className="p-4">
                    {fuel.station}
                  </td>

                  <td className="p-4">
                    {new Date(fuel.date).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => {
                        setSelectedFuel(fuel);
                        setOpenModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(fuel._id)}
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

      {/* Modal */}

      <FuelModal
        open={openModal}
        selectedFuel={selectedFuel}
        onSubmit={handleSubmit}
        onClose={() => {
          setSelectedFuel(null);
          setOpenModal(false);
        }}
      />

    </div>
  );
}