import { useEffect, useState } from "react";
import MaintenanceModal from "../components/MaintenanceModal";

import {
  getMaintenances,
  addMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "../utils/maintenanceApi";

export default function Maintenance() {
  const [maintenances, setMaintenances] = useState([]);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const fetchMaintenances = async () => {
    try {
      const res = await getMaintenances();
      setMaintenances(res.data.maintenances || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMaintenances();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (selectedMaintenance) {
        await updateMaintenance(selectedMaintenance._id, data);
      } else {
        await addMaintenance(data);
      }

      setSelectedMaintenance(null);
      setOpenModal(false);
      fetchMaintenances();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this maintenance record?")) return;

    try {
      await deleteMaintenance(id);
      fetchMaintenances();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMaintenances = maintenances.filter((item) => {
    const vehicle = item.vehicle?.vehicleNumber || "";
    const service = item.serviceType || "";

    return (
      vehicle.toLowerCase().includes(search.toLowerCase()) ||
      service.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Maintenance Management
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            Manage vehicle maintenance records
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedMaintenance(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Maintenance
        </button>

      </div>

      {/* Search */}

      <div className="mb-5">

        <input
          type="text"
          placeholder="Search vehicle or service..."
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

              <th className="p-4 text-left">Service</th>

              <th className="p-4 text-left">Cost</th>

              <th className="p-4 text-left">Service Date</th>

              <th className="p-4 text-left">Next Service</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredMaintenances.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-500"
                >
                  No Maintenance Records Found
                </td>

              </tr>

            ) : (

              filteredMaintenances.map((item) => (

                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-800"
                >

                  <td className="p-4 font-medium">
                    {item.vehicle?.vehicleNumber}
                  </td>

                  <td className="p-4">
                    {item.serviceType}
                  </td>

                  <td className="p-4">
                    ₹{item.cost}
                  </td>

                  <td className="p-4">
                    {new Date(item.serviceDate).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {new Date(item.nextServiceDate).toLocaleDateString()}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => {
                        setSelectedMaintenance(item);
                        setOpenModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
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

      <MaintenanceModal
        open={openModal}
        selectedMaintenance={selectedMaintenance}
        onSubmit={handleSubmit}
        onClose={() => {
          setSelectedMaintenance(null);
          setOpenModal(false);
        }}
      />

    </div>
  );
}