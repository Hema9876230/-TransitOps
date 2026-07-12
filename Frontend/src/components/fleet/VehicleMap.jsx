import React, { useMemo } from "react";

function VehicleMap({ vehicles = [] }) {
  const activeVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.status === "Active") || vehicles[0],
    [vehicles]
  );

  const mapQuery = encodeURIComponent(
    activeVehicle?.location || activeVehicle?.route || "India"
  );

  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&z=12&output=embed`;

  return (
    <section className="glass rounded-2xl p-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Live Tracking</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Ready for GPS API integration.
      </p>

      <div className="mt-4 h-56 rounded-2xl border border-gray-200/70 dark:border-gray-700/70 overflow-hidden bg-gray-100 dark:bg-gray-900">
        <iframe
          title="vehicle-live-map"
          src={mapSrc}
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/40 p-3">
          <p className="text-gray-500 dark:text-gray-400">Vehicle</p>
          <p className="font-medium text-gray-800 dark:text-gray-100 mt-1">
            {activeVehicle?.vehicleNumber || "No active vehicle"}
          </p>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/40 p-3">
          <p className="text-gray-500 dark:text-gray-400">Route</p>
          <p className="font-medium text-gray-800 dark:text-gray-100 mt-1">
            {activeVehicle?.route || "Not assigned"}
          </p>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/40 p-3 sm:col-span-2">
          <p className="text-gray-500 dark:text-gray-400">Last Updated</p>
          <p className="font-medium text-gray-800 dark:text-gray-100 mt-1">
            {activeVehicle?.updatedAt
              ? new Date(activeVehicle.updatedAt).toLocaleString()
              : "Just now"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default VehicleMap;
