import React from "react";
import Button from "../Button.jsx";

const documentItems = [
  { key: "rc", label: "RC Upload" },
  { key: "insurance", label: "Insurance" },
  { key: "pollution", label: "Pollution Certificate" },
  { key: "permit", label: "Permit" },
  { key: "fitness", label: "Fitness Certificate" },
];

function VehicleDocuments({ vehicles = [] }) {
  const expiryWarnings = vehicles
    .filter((vehicle) => vehicle.status === "Inactive" || vehicle.status === "Maintenance")
    .slice(0, 4)
    .map((vehicle) => `${vehicle.vehicleNumber} needs document review`);

  return (
    <section className="glass rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Vehicle Documents</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage compliance documents and expiry alerts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
        {documentItems.map((item) => (
          <div key={item.key} className="rounded-xl bg-gray-50 dark:bg-gray-800/40 p-3">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{item.label}</p>
            <Button type="button" variant="outline" className="mt-3 w-full">Upload</Button>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {expiryWarnings.length === 0 ? (
          <p className="text-sm text-green-700 dark:text-green-300">No expiry warnings right now.</p>
        ) : (
          expiryWarnings.map((warning) => (
            <div key={warning} className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-500/10 dark:border-amber-700/60 dark:text-amber-300">
              {warning}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default VehicleDocuments;
