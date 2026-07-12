import api from "../config/axios";

export const getMaintenances = () =>
  api.get("/maintenance");

export const addMaintenance = (data) =>
  api.post("/maintenance", data);

export const updateMaintenance = (id, data) =>
  api.put(`/maintenance/${id}`, data);

export const deleteMaintenance = (id) =>
  api.delete(`/maintenance/${id}`);