import React from "react";
import StatCard from "../components/StatCard.jsx";
import Table from "../components/Table.jsx";
import Badge from "../components/Badge.jsx";
import {
  statCards,
  recentTrips,
  driverStatusColors,
} from "../data/dummyData.js";

const tripColumns = [
  { key: "id", label: "Trip ID" },
  { key: "driver", label: "Driver" },
  { key: "vehicle", label: "Vehicle" },
  { key: "distance", label: "Distance" },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <Badge text={row.status} color={driverStatusColors[row.status]} />
    ),
  },
];

function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Overview of your fleet operations today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCard key={card.id} {...card} />
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Recent Trips
        </h2>
        <Table columns={tripColumns} rows={recentTrips} />
      </div>
    </div>
  );
}

export default DashboardPage;
