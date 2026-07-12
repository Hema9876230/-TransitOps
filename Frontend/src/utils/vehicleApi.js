import api from "../config/axios";

export const getVehicles = async () => {
  return await api.get("/vehicles");
};

export const addVehicle = async (data) => {
  return await api.post("/vehicles", data);
};

export const updateVehicle = async (id, data) => {
  return await api.put(`/vehicles/${id}`, data);
};

export const deleteVehicle = async (id) => {
  return await api.delete(`/vehicles/${id}`);
};