import api from "../config/axios";

export const getDrivers = () => api.get("/drivers");

export const addDriver = (data) => api.post("/drivers", data);

export const updateDriver = (id, data) =>
  api.put(`/drivers/${id}`, data);

export const deleteDriver = (id) =>
  api.delete(`/drivers/${id}`);