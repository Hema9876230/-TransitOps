import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Badge from "../components/Badge.jsx";
import { getVehicles } from "../services/vehicleService.js";

function VehicleDetailsPage() {
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVehicle = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getVehicles();
        const foundVehicle = data.vehicles.find((item) => item._id === vehicleId);

        if (!foundVehicle) {
          setError("Vehicle details not found.");
        } else {
          setVehicle(foundVehicle);
        }
      } catch (requestError) {
        setError(
          requestError?.response?.data?.message ||
            "Unable to load vehicle details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, [vehicleId]);

  const maintenanceHistory = useMemo(
    () => vehicle?.maintenanceHistory || [
      {
        id: "mh-1",
        service: "Engine inspection",
        date: "2026-06-10",
        cost: 3500,
      },
    ],
    [vehicle]
  );

  const tripHistory = useMemo(
    () => vehicle?.tripHistory || [
      {
        id: "tr-1",
        route: vehicle?.route || "Main Route",
        distance: `${vehicle?.distanceCovered || 0} km`,
        completedOn: "2026-07-10",
      },
    ],
    [vehicle]
  );

  const fuelRecords = useMemo(
    () => vehicle?.fuelRecords || [
      {
        id: "fr-1",
        fuelType: vehicle?.fuelType || "Diesel",
        quantity: `${vehicle?.fuelConsumption || 0} L`,
        date: "2026-07-09",
      },
    ],
    [vehicle]
  );

  if (loading) {
    return (
      <div className="glass rounded-2xl p-8 text-sm text-gray-500 dark:text-gray-400">
        Loading vehicle details...
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="glass rounded-2xl p-8">
        <p className="text-sm text-red-600 dark:text-red-300">{error || "Vehicle not found"}</p>
        <Link to="/dashboard/fleet" className="inline-block mt-4 text-sm text-[#f59e0b] hover:underline">
          Back to Fleet
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {vehicle.vehicleNumber}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Vehicle operational details and history
          </p>
        </div>
        <Link to="/dashboard/fleet" className="text-sm text-[#f59e0b] hover:underline">
          Back to Fleet
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="glass rounded-2xl p-5 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Vehicle Information</h2>
          <p className="text-sm text-gray-700 dark:text-gray-200">Type: {vehicle.vehicleType}</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">Route: {vehicle.route}</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">Fuel Type: {vehicle.fuelType}</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">Capacity: {vehicle.capacity || "-"}</p>
          <Badge text={vehicle.status} color={vehicle.status === "Active" ? "success" : vehicle.status === "Maintenance" ? "primary" : "grey"} />
        </section>

        <section className="glass rounded-2xl p-5 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Driver Details</h2>
          <p className="text-sm text-gray-700 dark:text-gray-200">Name: {vehicle.driverName}</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">Last Known Location: {vehicle.location}</p>
        </section>
      </div>

      <section className="glass rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-200">
          <p>RC: Uploaded</p>
          <p>Insurance: Uploaded</p>
          <p>Pollution Certificate: Uploaded</p>
          <p>Fitness Certificate: Uploaded</p>
        </div>
      </section>

      <section className="glass rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Maintenance History</h2>
        <div className="space-y-2">
          {maintenanceHistory.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800/40 p-3 text-sm">
              <span className="text-gray-700 dark:text-gray-200">{item.service}</span>
              <span className="text-gray-500 dark:text-gray-400">{item.date} - Rs. {item.cost}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Trip History</h2>
          <div className="space-y-2">
            {tripHistory.map((item) => (
              <div key={item.id} className="rounded-xl bg-gray-50 dark:bg-gray-800/40 p-3 text-sm text-gray-700 dark:text-gray-200">
                <p>{item.route}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.distance} - {item.completedOn}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Fuel Records</h2>
          <div className="space-y-2">
            {fuelRecords.map((item) => (
              <div key={item.id} className="rounded-xl bg-gray-50 dark:bg-gray-800/40 p-3 text-sm text-gray-700 dark:text-gray-200">
                <p>{item.fuelType}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.quantity} - {item.date}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default VehicleDetailsPage;
