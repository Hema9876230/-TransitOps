import React from "react";
import VehicleRow from "./VehicleRow.jsx";

const VehicleTable = ({
  vehicles = [],
  loading = false,
  error = "",
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="glass rounded-2xl p-10 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Loading vehicles...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-300 bg-red-50 text-red-700 px-4 py-4 text-sm dark:bg-red-500/10 dark:text-red-300 dark:border-red-700/60">
        {error}
      </div>
    );
  }

  if (!vehicles.length) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          No vehicles found
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Try a different filter or add a new vehicle.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto glass rounded-2xl">
      <table className="min-w-full">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr className="text-left">
            <th className="px-4 py-3 text-sm font-semibold">Vehicle Number</th>
            <th className="px-4 py-3 text-sm font-semibold">Type</th>
            <th className="px-4 py-3 text-sm font-semibold">Driver</th>
            <th className="px-4 py-3 text-sm font-semibold">Status</th>
            <th className="px-4 py-3 text-sm font-semibold">Route</th>
            <th className="px-4 py-3 text-sm font-semibold text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle) => (
            <VehicleRow
              key={vehicle._id}
              vehicle={vehicle}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;