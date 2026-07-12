import React, { useMemo } from "react";
import StatCard from "../StatCard.jsx";

const FleetStats = ({ vehicles = [] }) => {
  const stats = useMemo(() => {
    const totalVehicles = vehicles.length;
    const activeVehicles = vehicles.filter((vehicle) => vehicle.status === "Active").length;
    const inactiveVehicles = vehicles.filter((vehicle) => vehicle.status === "Inactive").length;
    const maintenanceDue = vehicles.filter((vehicle) => vehicle.status === "Maintenance").length;

    const totalDistanceCovered = vehicles.reduce(
      (sum, vehicle) => sum + Number(vehicle.distanceCovered || 0),
      0
    );

    const totalFuelConsumption = vehicles.reduce(
      (sum, vehicle) => sum + Number(vehicle.fuelConsumption || 0),
      0
    );

    return [
      {
        id: "total",
        label: "Total Vehicles",
        value: totalVehicles,
        change: "Current fleet size",
        accent: "secondary",
      },
      {
        id: "active",
        label: "Active Vehicles",
        value: activeVehicles,
        change: "Operational vehicles",
        accent: "success",
      },
      {
        id: "inactive",
        label: "Inactive Vehicles",
        value: inactiveVehicles,
        change: "Not currently in operation",
        accent: "danger",
      },
      {
        id: "maintenance",
        label: "Maintenance Due",
        value: maintenanceDue,
        change: "Need service attention",
        accent: "primary",
      },
      {
        id: "distance",
        label: "Total Distance Covered",
        value: `${totalDistanceCovered.toLocaleString()} km`,
        change: "Combined fleet mileage",
        accent: "secondary",
      },
      {
        id: "fuel",
        label: "Fuel Consumption",
        value: `${totalFuelConsumption.toFixed(1)} L`,
        change: "Estimated total usage",
        accent: "primary",
      },
    ];
  }, [vehicles]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          label={stat.label}
          value={stat.value}
          change={stat.change}
          accent={stat.accent}
        />
      ))}
    </div>
  );
};

export default FleetStats;