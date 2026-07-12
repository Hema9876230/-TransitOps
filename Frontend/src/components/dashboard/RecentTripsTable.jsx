import React from "react";
import { recentTrips } from "../../data/dashboardData";

const statusStyles = {
  Draft:
    "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",

  Dispatched:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",

  "On Trip":
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",

  Completed:
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",

  Cancelled:
    "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

const RecentTripsTable = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-[#161b22]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Recent Trips
        </h2>

        <button className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-[#1d232a]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Trip ID
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Vehicle
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Driver
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                ETA
              </th>
            </tr>
          </thead>

          <tbody>
            {recentTrips.map((trip) => (
              <tr
                key={trip.id}
                className="border-t border-gray-200 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-[#1d232a]"
              >
                <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                  {trip.id}
                </td>

                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {trip.vehicle}
                </td>

                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {trip.driver}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyles[trip.status]
                    }`}
                  >
                    {trip.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {trip.eta}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTripsTable;