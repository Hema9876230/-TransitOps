import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FleetStats from "../components/fleet/FleetStats.jsx";
import FleetFilters from "../components/fleet/FleetFilters.jsx";
import VehicleTable from "../components/fleet/VehicleTable.jsx";
import AddVehicleModal from "../components/fleet/AddVehicleModal.jsx";
import MaintenanceCard from "../components/fleet/MaintenanceCard.jsx";
import MaintenanceModal from "../components/fleet/MaintenanceModal.jsx";
import VehicleDocuments from "../components/fleet/VehicleDocuments.jsx";
import VehicleMap from "../components/fleet/VehicleMap.jsx";
import FleetAnalytics from "../components/fleet/FleetAnalytics.jsx";
import FleetNotifications from "../components/fleet/FleetNotifications.jsx";
import {
  getVehicles,
  updateVehicle,
  deleteVehicle,
} from "../services/vehicleService.js";

function FleetPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [vehicleType, setVehicleType] = useState("All");
  const [fuelType, setFuelType] = useState("All");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openMaintenanceModal, setOpenMaintenanceModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadVehicles = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getVehicles({ search, status, vehicleType });
      setVehicles(data.vehicles);
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Unable to load vehicles. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [search, status, vehicleType]);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesFuel = fuelType === "All" || vehicle.fuelType === fuelType;
      const matchesCapacity = !capacity || Number(vehicle.capacity || 0) >= Number(capacity);
      const matchesLocation =
        !location ||
        String(vehicle.location || "")
          .toLowerCase()
          .includes(location.toLowerCase());

      return matchesFuel && matchesCapacity && matchesLocation;
    });
  }, [vehicles, fuelType, capacity, location]);

  const handleReset = () => {
    setSearch("");
    setStatus("All");
    setVehicleType("All");
    setFuelType("All");
    setCapacity("");
    setLocation("");
  };

  const handleEdit = async (vehicle) => {
    const nextStatus = vehicle.status === "Active" ? "Maintenance" : "Active";

    try {
      setError("");
      await updateVehicle(vehicle._id, { status: nextStatus });
      await loadVehicles();
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Unable to update vehicle right now."
      );
    }
  };

  const handleDelete = async (vehicle) => {
    const isConfirmed = window.confirm(
      `Delete vehicle ${vehicle.vehicleNumber}?`
    );

    if (!isConfirmed) {
      return;
    }

    try {
      setError("");
      await deleteVehicle(vehicle._id);
      await loadVehicles();
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Unable to delete vehicle right now."
      );
    }
  };

  const handleViewDetails = (vehicle) => {
    navigate(`/dashboard/fleet/${vehicle._id}`);
  };

  const handleOpenMaintenance = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenMaintenanceModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Fleet Management
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your vehicles, monitor status, and keep routes organized.
        </p>
      </div>

      <FleetStats vehicles={filteredVehicles} />

      <FleetFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        vehicleType={vehicleType}
        setVehicleType={setVehicleType}
        fuelType={fuelType}
        setFuelType={setFuelType}
        capacity={capacity}
        setCapacity={setCapacity}
        location={location}
        setLocation={setLocation}
        onAddVehicle={() => setOpenModal(true)}
        onReset={handleReset}
      />

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 text-red-700 px-4 py-3 text-sm dark:bg-red-500/10 dark:text-red-300 dark:border-red-700/60">
          {error}
        </div>
      )}

      <VehicleTable
        vehicles={filteredVehicles}
        loading={loading}
        error={error}
        onView={handleViewDetails}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <MaintenanceCard
          vehicles={filteredVehicles}
          onManageMaintenance={(vehicle) => handleOpenMaintenance(vehicle)}
        />
        <VehicleMap vehicles={filteredVehicles} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <FleetAnalytics vehicles={filteredVehicles} />
        <FleetNotifications vehicles={filteredVehicles} />
      </div>

      <VehicleDocuments vehicles={filteredVehicles} />

      <AddVehicleModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onVehicleAdded={loadVehicles}
      />

      <MaintenanceModal
        isOpen={openMaintenanceModal}
        onClose={() => setOpenMaintenanceModal(false)}
        vehicle={selectedVehicle}
      />
    </div>
  );
}

export default FleetPage;
