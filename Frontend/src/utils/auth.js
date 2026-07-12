// Small helpers around sessionStorage so components don't
// need to know the exact storage keys.

export const saveAuth = (token, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const getToken = () => sessionStorage.getItem("token");

export const getUser = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => Boolean(getToken());

export const logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};
