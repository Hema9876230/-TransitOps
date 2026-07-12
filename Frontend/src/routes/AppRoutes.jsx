import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import { useAuth } from "../context/AuthContext.jsx";

import Vehicle from "../pages/Vehicle.jsx";
import Driver from "../pages/Driver.jsx";
import Trip from "../pages/Trip.jsx";
import Maintenance from "../pages/Maintenance.jsx";
import FuelExpenses from "../pages/FuelExpenses.jsx";
import Analytics from "../pages/Analytics.jsx";
import Settings from "../pages/Settings.jsx";

function ProtectedRoute({ children }) {
  const { isLogin } = useAuth();

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const { isLogin } = useAuth();

  if (isLogin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AppRoutes({ theme, setTheme }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout theme={theme} setTheme={setTheme} />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="fleet" element={<Vehicle />} />
        <Route path="drivers" element={<Driver />} />
        <Route path="trips" element={<Trip />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="fuel-expenses" element={<FuelExpenses />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;