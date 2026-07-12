import api from "../config/axios";

export const getTrips = () => api.get("/trips");

export const createTrip = (data) =>
  api.post("/trips", data);

export const updateTrip = (id, data) =>
  api.put(`/trips/${id}`, data);

export const completeTrip = (id) =>
  api.put(`/trips/complete/${id}`);

export const deleteTrip = (id) =>
  api.delete(`/trips/${id}`);