import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import PlaceholderPage from "../pages/PlaceholderPage.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import { useAuth } from "../context/AuthContext.jsx";

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
        <Route path="fleet" element={<PlaceholderPage title="Fleet" />} />
        <Route path="drivers" element={<PlaceholderPage title="Drivers" />} />
        <Route path="trips" element={<PlaceholderPage title="Trips" />} />
        <Route
          path="maintenance"
          element={<PlaceholderPage title="Maintenance" />}
        />
        <Route
          path="fuel-expenses"
          element={<PlaceholderPage title="Fuel & Expenses" />}
        />
        <Route
          path="analytics"
          element={<PlaceholderPage title="Analytics" />}
        />
        <Route path="settings" element={<PlaceholderPage title="Settings" />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
