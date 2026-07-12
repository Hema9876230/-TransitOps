import React, { useMemo } from "react";

function FleetNotifications({ vehicles = [] }) {
  const notifications = useMemo(() => {
    const alerts = [];

    vehicles.forEach((vehicle) => {
      if (vehicle.status === "Inactive") {
        alerts.push({
          id: `${vehicle._id}-inactive`,
          type: "Vehicle Inactive",
          message: `${vehicle.vehicleNumber} is currently inactive.`,
        });
      }

      if (vehicle.status === "Maintenance") {
        alerts.push({
          id: `${vehicle._id}-service`,
          type: "Service Due",
          message: `${vehicle.vehicleNumber} requires maintenance attention.`,
        });
      }

      if (vehicle.status !== "Inactive" && vehicle.status !== "Maintenance") {
        alerts.push({
          id: `${vehicle._id}-insurance`,
          type: "Insurance Expiry",
          message: `${vehicle.vehicleNumber} insurance needs periodic verification.`,
        });
      }
    });

    return alerts.slice(0, 8);
  }, [vehicles]);

  return (
    <section className="glass rounded-2xl p-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Fleet Notifications</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Real-time operational alerts and reminders.
      </p>

      <div className="mt-4 space-y-2 max-h-80 overflow-auto pr-1">
        {notifications.length === 0 ? (
          <div className="rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-700/60 px-3 py-3 text-sm text-green-700 dark:text-green-300">
            No active alerts.
          </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="rounded-xl border border-gray-200 dark:border-gray-700/60 bg-white/70 dark:bg-gray-800/30 px-3 py-3">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{notification.type}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default FleetNotifications;
