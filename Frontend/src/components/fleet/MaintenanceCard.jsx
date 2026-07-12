import React from "react";
import Button from "../Button.jsx";

function MaintenanceCard({ vehicles = [], onManageMaintenance }) {
  const maintenanceVehicles = vehicles.filter((vehicle) => vehicle.status === "Maintenance");
  const upcomingService = maintenanceVehicles[0];
  const totalMaintenanceCost = vehicles.reduce(
    (sum, vehicle) => sum + Number(vehicle.maintenanceCost || 0),
    0
  );

  return (
    <section className="glass rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Maintenance Management</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track upcoming service and maintenance expenses.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => upcomingService && onManageMaintenance(upcomingService)}
          disabled={!upcomingService}
        >
          Manage
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/40 p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">Upcoming Service</p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mt-1">
            {upcomingService?.vehicleNumber || "No service due"}
          </p>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/40 p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">Repair History</p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mt-1">
            {maintenanceVehicles.length} records
          </p>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/40 p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">Maintenance Cost</p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mt-1">
            Rs. {totalMaintenanceCost.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-500/10 dark:border-amber-700/60 dark:text-amber-300">
        Service reminder: schedule maintenance at least 7 days before due date.
      </div>
    </section>
  );
}

export default MaintenanceCard;
