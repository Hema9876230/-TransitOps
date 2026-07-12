// import React from "react";
// import StatCard from "../components/StatCard.jsx";
// import Table from "../components/Table.jsx";
// import Badge from "../components/Badge.jsx";
// import {
//   statCards,
//   recentTrips,
//   driverStatusColors,
// } from "../data/dummyData.js";

// const tripColumns = [
//   { key: "id", label: "Trip ID" },
//   { key: "driver", label: "Driver" },
//   { key: "vehicle", label: "Vehicle" },
//   { key: "distance", label: "Distance" },
//   {
//     key: "status",
//     label: "Status",
//     render: (row) => (
//       <Badge text={row.status} color={driverStatusColors[row.status]} />
//     ),
//   },
// ];

// function DashboardPage() {
//   return (
//     <div className="flex flex-col gap-6">
//       <div>
//         <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
//           Dashboard
//         </h1>
//         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//           Overview of your fleet operations today.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//         {statCards.map((card) => (
//           <StatCard key={card.id} {...card} />
//         ))}
//       </div>

//       <div>
//         <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
//           Recent Trips
//         </h2>
//         <Table columns={tripColumns} rows={recentTrips} />
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;

import React, { useState } from "react";

import Filters from "../components/dashboard/Filters";
import KPIcard from "../components/dashboard/KPIcard";
import RecentTripsTable from "../components/dashboard/RecentTripsTable";
import VehicleStatus from "../components/dashboard/VehicleStatus";
import { stats } from "../data/dashboardData";

function DashboardPage() {
  const [search, setSearch] = useState("");
  const [vehicleType, setVehicleType] = useState("All");
  const [status, setStatus] = useState("All");
  const [region, setRegion] = useState("All");

  return (
    <div className="space-y-6">
      {/* Header */}
      <p className=" text-gray-500 dark:text-gray-400">
        Monitor your fleet operations in real time.
      </p>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-[#161b22]">
        <Filters
          vehicleType={vehicleType}
          setVehicleType={setVehicleType}
          status={status}
          setStatus={setStatus}
          region={region}
          setRegion={setRegion}
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {stats.map((item) => (
          <KPIcard
            key={item.id}
            title={item.title}
            value={item.value}
            color={item.color}
          />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentTripsTable />
        </div>

        <VehicleStatus />
      </div>
    </div>
  );
}

export default DashboardPage;
