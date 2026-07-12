import api from "./api";

// Calls POST /auth/login with { email, password }.
// Expected backend response shape:
// { token: "jwt...", user: { name, email, role } }
export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};
