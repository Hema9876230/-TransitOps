import api from "../config/axios";

export const getFuels = () => api.get("/fuel");

export const addFuel = (data) =>
  api.post("/fuel", data);

export const updateFuel = (id, data) =>
  api.put(`/fuel/${id}`, data);

export const deleteFuel = (id) =>
  api.delete(`/fuel/${id}`);