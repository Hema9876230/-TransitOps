import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4500/api",
});

api.interceptors.request.use((config) => {
  // Check localStorage first
  let token = localStorage.getItem("transitOpsToken");

  // If Remember Me is not selected, token is stored in sessionStorage
  if (!token) {
    token = sessionStorage.getItem("transitOpsToken");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;