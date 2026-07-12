import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");

    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log({ email, password });

    try {
      const res = await api.post("/auth/login", { email, password });
      alert(res.data.message);
      saveAuth(res.data.data);
      if (rememberMe) {
        localStorage.setItem("TansistOps", res.data.data);
      } else {
        sessionStorage.setItem("TansistOps", res.data.data);
      }
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot Password feature coming soon.");
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md glass rounded-2xl shadow-lg p-8">
        <div className="flex flex-col mb-6">
          <div className="text-start">
            <h1 className="text-lg font-semibold mt-3 text-gray-900 dark:text-white">
              Sign in to your FleetOps account
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Enter your ceredentials to continue
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            icon={FiMail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
          />

          <Input
            label="Password"
            type="password"
            icon={FiLock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3 w-3 rounded border-gray-300 accent-[#f59e0b] cursor-pointer"
              />
              Remember Me
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm font-medium text-[#f59e0b]/40 hover:text-[#f59e0b]/70 hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-500/10 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="font-semibold text-[#f59e0b]/80 hover:text-[#f59e0b] hover:underline transition cursor-pointer"
            >
              Sign Up
            </button>
          </p>
        </form>

        <p className="text-xs text-gray-400 mt-6 text-center">
          Fleet Manager · Dispatcher · Safety Officer · Financial Analyst
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
