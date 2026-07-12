import React, { useEffect, useState, useContext } from "react";
import { clearStoredAuth, getStoredAuth, persistAuth } from "../utils/authStorage.js";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const initialAuth = getStoredAuth();
  const [user, setUser] = useState(initialAuth.user);
  const [token, setToken] = useState(initialAuth.token);
  const [isLogin, setIsLogin] = useState(Boolean(initialAuth.user && initialAuth.token));
  const [role, setRole] = useState(initialAuth.user?.role || "");

  useEffect(() => {
    setIsLogin(!!user);
    setRole(user?.role || "");
  }, [user]);

  const login = (nextUser, nextToken, rememberMe = false) => {
    setUser(nextUser);
    setToken(nextToken);
    persistAuth({ token: nextToken, user: nextUser, rememberMe });
  };

  const logout = () => {
    setUser(null);
    setToken("");
    setIsLogin(false);
    setRole("");
    clearStoredAuth();
  };

  const value = {
    user,
    token,
    setUser,
    setToken,
    isLogin,
    setIsLogin,
    role,
    setRole,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
