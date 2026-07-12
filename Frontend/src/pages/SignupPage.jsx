import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
// import { registerUser } from "../services/authService.js";

const SignupPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      return setError("Full name is required.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (!agree) {
      return setError("Please accept the Terms & Privacy Policy.");
    }

    try {
      setLoading(true);

      // Backend integration
      // await registerUser({
      //   name,
      //   email,
      //   password,
      // });

      console.log({
        name,
        email,
        password,
        role,
      });

      if (!role) {
        return setError("Please select your role.");
      }
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      setError("Unable to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md glass rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-lg font-semibold mt-3 text-gray-900 dark:text-white">
            Create your FleetOps account
          </h1>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Join FleetOps to manage fleets, drivers and operations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Full Name"
            type="text"
            icon={FiUser}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />

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

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f59e0b] cursor-pointer"
              required
            >
              <option value="">Select your role</option>
              <option value="fleet_manager">Fleet Manager</option>
              <option value="dispatcher">Dispatcher</option>
              <option value="driver">Driver</option>
              <option value="maintenance">Maintenance Manager</option>
              <option value="safety_officer">Safety Officer</option>
              <option value="financial_analyst">Financial Analyst</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-500/10 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold text-[#f59e0b]/80 hover:text-[#f59e0b] hover:underline transition cursor-pointer"
            >
              Sign In
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

export default SignupPage;
