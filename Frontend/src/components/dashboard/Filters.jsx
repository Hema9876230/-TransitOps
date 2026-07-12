import React from "react";
import {
  vehicleTypes,
  statuses,
  regions,
} from "../../data/dashboardData";

const Filters = ({
  vehicleType,
  setVehicleType,
  status,
  setStatus,
  region,
  setRegion,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Vehicle Type */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
          Vehicle Type
        </label>

        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 dark:border-gray-700 dark:bg-[#161b22] dark:text-white"
        >
          {vehicleTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
          Status
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 dark:border-gray-700 dark:bg-[#161b22] dark:text-white"
        >
          {statuses.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      {/* Region */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
          Region
        </label>

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 dark:border-gray-700 dark:bg-[#161b22] dark:text-white"
        >
          {regions.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;