import axios from "axios";

// Central axios instance. Backend does not exist yet — point this
// baseURL at your real API server when it's ready.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4500/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token (if present) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
