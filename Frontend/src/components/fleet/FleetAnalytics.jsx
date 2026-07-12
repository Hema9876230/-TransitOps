import React, { useMemo } from "react";

function Meter({ label, value, max, suffix = "" }) {
  const percentage = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="text-gray-600 dark:text-gray-300">{label}</span>
        <span className="text-gray-800 dark:text-gray-100 font-medium">{value}{suffix}</span>
      </div>
      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div className="h-full bg-[#3b82f6]" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function FleetAnalytics({ vehicles = [] }) {
  const analytics = useMemo(() => {
    const total = vehicles.length || 1;
    const active = vehicles.filter((v) => v.status === "Active").length;
    const utilization = Math.round((active / total) * 100);

    const totalFuel = vehicles.reduce((sum, v) => sum + Number(v.fuelConsumption || 0), 0);
    const avgFuel = Number((totalFuel / total).toFixed(1));

    const maintenanceCost = vehicles.reduce((sum, v) => sum + Number(v.maintenanceCost || 0), 0);
    const totalDistance = vehicles.reduce((sum, v) => sum + Number(v.distanceCovered || 0), 0);

    return {
      utilization,
      avgFuel,
      maintenanceCost,
      totalDistance,
    };
  }, [vehicles]);

  const maxDistance = Math.max(analytics.totalDistance, 1);
  const maxMaintenance = Math.max(analytics.maintenanceCost, 1);

  return (
    <section className="glass rounded-2xl p-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Fleet Analytics</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Utilization, fuel, maintenance, and distance trends.
      </p>

      <div className="mt-4 space-y-4">
        <Meter label="Vehicle Utilization" value={analytics.utilization} max={100} suffix="%" />
        <Meter label="Fuel Consumption" value={analytics.avgFuel} max={100} suffix=" L/vehicle" />
        <Meter label="Maintenance Cost" value={analytics.maintenanceCost} max={maxMaintenance} suffix=" Rs" />
        <Meter label="Distance Travelled" value={analytics.totalDistance} max={maxDistance} suffix=" km" />
      </div>
    </section>
  );
}

export default FleetAnalytics;
