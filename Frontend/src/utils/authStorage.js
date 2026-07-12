const USER_KEY = "transitOpsUser";
const TOKEN_KEY = "transitOpsToken";

const readStorage = () => {
  const localToken = localStorage.getItem(TOKEN_KEY);
  const localUser = localStorage.getItem(USER_KEY);

  if (localToken && localUser) {
    return {
      token: localToken,
      user: JSON.parse(localUser),
      storage: localStorage,
    };
  }

  const sessionToken = sessionStorage.getItem(TOKEN_KEY);
  const sessionUser = sessionStorage.getItem(USER_KEY);

  if (sessionToken && sessionUser) {
    return {
      token: sessionToken,
      user: JSON.parse(sessionUser),
      storage: sessionStorage,
    };
  }

  return {
    token: "",
    user: null,
    storage: null,
  };
};

export const getStoredAuth = () => readStorage();

export const persistAuth = ({ token, user, rememberMe = false }) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);

  if (token && user) {
    storage.setItem(TOKEN_KEY, token);
    storage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const clearStoredAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
};