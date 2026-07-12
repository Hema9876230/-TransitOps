import api from "../config/axios";

export const getAnalytics = () =>
  api.get("/analytics");