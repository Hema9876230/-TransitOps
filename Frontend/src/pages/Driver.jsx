import { useEffect, useState } from "react";
import DriverModal from "../components/DriverModal";

import {
  getDrivers,
  addDriver,
  updateDriver,
  deleteDriver,
} from "../utils/driverApi";

export default function Driver() {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch Drivers
  const fetchDrivers = async () => {
    try {
      const res = await getDrivers();
      setDrivers(res.data.drivers || []);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Add / Update Driver
  const handleSubmit = async (data) => {
    try {
      if (selectedDriver) {
        await updateDriver(selectedDriver._id, data);
      } else {
        await addDriver(data);
      }

      setSelectedDriver(null);
      setOpenModal(false);
      fetchDrivers();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Driver
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this driver?")) return;

    try {
      await deleteDriver(id);
      fetchDrivers();
    } catch (err) {
      console.error(err);
    }
  };

  // Search
  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(search.toLowerCase()) ||
      driver.phone.includes(search)
  );

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Driver Management
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            Manage all drivers in your fleet.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedDriver(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Driver
        </button>

      </div>

      {/* Search */}

      <div className="mb-5">

        <input
          type="text"
          placeholder="Search driver..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Table */}

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 dark:bg-gray-800">

            <tr>

              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Phone</th>
              <th className="text-left p-4">License</th>
              <th className="text-left p-4">Experience</th>
              <th className="text-left p-4">Status</th>
              <th className="text-center p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredDrivers.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No Drivers Found
                </td>

              </tr>

            ) : (

              filteredDrivers.map((driver) => (

                <tr
                  key={driver._id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-800"
                >

                  <td className="p-4 font-medium">
                    {driver.name}
                  </td>

                  <td className="p-4">
                    {driver.phone}
                  </td>

                  <td className="p-4">
                    {driver.licenseNumber}
                  </td>

                  <td className="p-4">
                    {driver.experience} Years
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          driver.status === "Available"
                            ? "bg-green-100 text-green-700"
                            : driver.status === "On Trip"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {driver.status}
                    </span>

                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => {
                        setSelectedDriver(driver);
                        setOpenModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(driver._id)}
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

      {/* Driver Modal */}

      <DriverModal
        open={openModal}
        selectedDriver={selectedDriver}
        onSubmit={handleSubmit}
        onClose={() => {
          setSelectedDriver(null);
          setOpenModal(false);
        }}
      />

    </div>
  );
}