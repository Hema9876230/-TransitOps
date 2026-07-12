import api from "../api/axios.js";

const VEHICLES_ENDPOINT = "/api/vehicles";

const mapStatusToApi = (status) => {
  if (status === "Active") {
    return "Available";
  }
  return status;
};

const mapStatusFromApi = (status) => {
  if (status === "Available") {
    return "Active";
  }
  return status || "Inactive";
};

const normalizeVehicle = (vehicle = {}) => ({
  _id: vehicle._id,
  vehicleNumber: vehicle.vehicleNumber || "-",
  vehicleType: vehicle.vehicleType || "-",
  driverName: vehicle.driver?.name || vehicle.driverName || "Unassigned",
  status: mapStatusFromApi(vehicle.status),
  route: vehicle.route || "Not Assigned",
  fuelType: vehicle.fuelType || "Diesel",
  capacity: vehicle.capacity ?? "",
  location: vehicle.location || vehicle.route || "Unknown",
  distanceCovered: Number(vehicle.distanceCovered || 0),
  fuelConsumption: Number(vehicle.fuelConsumption || 0),
  maintenanceCost: Number(vehicle.maintenanceCost || 0),
  documents: vehicle.documents || {},
  maintenanceHistory: vehicle.maintenanceHistory || [],
  tripHistory: vehicle.tripHistory || [],
  fuelRecords: vehicle.fuelRecords || [],
  updatedAt: vehicle.updatedAt,
});

export const getVehicles = async (filters = {}) => {
  const params = {};

  if (filters.search?.trim()) {
    params.search = filters.search.trim();
  }

  if (filters.status && filters.status !== "All") {
    params.status = mapStatusToApi(filters.status);
  }

  if (filters.vehicleType && filters.vehicleType !== "All") {
    params.vehicleType = filters.vehicleType;
  }

  const response = await api.get(VEHICLES_ENDPOINT, { params });
  const list = response.data?.vehicles || [];

  return {
    vehicles: list.map(normalizeVehicle),
    totalVehicles: response.data?.totalVehicles || list.length,
  };
};

export const createVehicle = async (payload) => {
  const today = new Date();
  const nextYear = new Date(today);
  nextYear.setFullYear(today.getFullYear() + 1);

  const body = {
    vehicleNumber: payload.vehicleNumber,
    registrationNumber: payload.registrationNumber || payload.vehicleNumber,
    vehicleType: payload.vehicleType,
    model: payload.model || `${payload.vehicleType} Standard`,
    capacity: payload.capacity || 40,
    fuelType: payload.fuelType || "Diesel",
    status: mapStatusToApi(payload.status),
    insuranceExpiry: payload.insuranceExpiry || nextYear.toISOString(),
    pollutionExpiry: payload.pollutionExpiry || nextYear.toISOString(),
    fitnessExpiry: payload.fitnessExpiry || nextYear.toISOString(),
    driverName: payload.driverName,
    route: payload.route,
  };

  const response = await api.post(VEHICLES_ENDPOINT, body);
  return normalizeVehicle(response.data?.vehicle || body);
};

export const updateVehicle = async (vehicleId, updates) => {
  const body = {
    ...updates,
  };

  if (updates.status) {
    body.status = mapStatusToApi(updates.status);
  }

  const response = await api.put(`${VEHICLES_ENDPOINT}/${vehicleId}`, body);
  return normalizeVehicle(response.data?.vehicle || { _id: vehicleId, ...updates });
};

export const deleteVehicle = async (vehicleId) => {
  const response = await api.delete(`${VEHICLES_ENDPOINT}/${vehicleId}`);
  return response.data;
};
