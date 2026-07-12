import api from "../config/axios";

export const getDashboard = () => {
  return api.get("/dashboard");
};