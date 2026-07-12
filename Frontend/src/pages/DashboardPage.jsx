import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard.jsx";
import Table from "../components/Table.jsx";
import Badge from "../components/Badge.jsx";
import { getDashboard } from "../utils/dashboardApi.js";

function DashboardPage() {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    availableVehicles: 0,
    totalDrivers: 0,
    activeTrips: 0,
    completedTrips: 0,
    maintenanceVehicles: 0,
  });

  const [recentTrips, setRecentTrips] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();

      setStats(res.data.stats);
      setRecentTrips(res.data.recentTrips);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  const statCards = [
    {
      id: 1,
      title: "Total Vehicles",
      value: stats.totalVehicles,
      color: "blue",
    },
    {
      id: 2,
      title: "Available Vehicles",
      value: stats.availableVehicles,
      color: "green",
    },
    {
      id: 3,
      title: "Drivers",
      value: stats.totalDrivers,
      color: "yellow",
    },
    {
      id: 4,
      title: "Active Trips",
      value: stats.activeTrips,
      color: "red",
    },
    {
      id: 5,
      title: "Completed Trips",
      value: stats.completedTrips,
      color: "green",
    },
    {
      id: 6,
      title: "Maintenance",
      value: stats.maintenanceVehicles,
      color: "orange",
    },
  ];

  const tripColumns = [
    {
      key: "vehicle",
      label: "Vehicle",
      render: (row) => row.vehicle?.vehicleNumber || "-",
    },
    {
      key: "driver",
      label: "Driver",
      render: (row) => row.driver?.name || "-",
    },
    {
      key: "source",
      label: "Source",
    },
    {
      key: "destination",
      label: "Destination",
    },
    {
      key: "distance",
      label: "Distance",
      render: (row) => `${row.distance} km`,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge
          text={row.status}
          color={
            row.status === "Completed"
              ? "green"
              : row.status === "In Transit"
              ? "blue"
              : row.status === "Cancelled"
              ? "red"
              : "yellow"
          }
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Live overview of your fleet operations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <StatCard
            key={card.id}
            title={card.title}
            value={card.value}
            color={card.color}
          />
        ))}
      </div>

      <div>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Recent Trips
        </h2>

        <Table
          columns={tripColumns}
          rows={recentTrips}
        />

      </div>

    </div>
  );
}

export default DashboardPage;