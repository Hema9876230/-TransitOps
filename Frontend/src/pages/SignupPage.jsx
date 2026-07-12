import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import api from "../config/Api.jsx";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClear = () => {
    setFormdata({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, role } = formdata;

    if (!name.trim()) {
      return setError("Full name is required.");
    }

    if (!email.trim()) {
      return setError("Email is required.");
    }

    if (!password.trim()) {
      return setError("Password is required.");
    }

    if (!role) {
      return setError("Please select your role.");
    }

    try {
      setLoading(true);
      console.log(formdata);
      const res = await api.post("/auth/register", formdata);
      handleClear();
      alert(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      console.log(error);
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
            name="name"
            type="text"
            icon={FiUser}
            value={formdata.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            icon={FiMail}
            value={formdata.email}
            onChange={handleChange}
            placeholder="you@company.com"
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            icon={FiLock}
            value={formdata.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Role
            </label>

            <select
              name="role"
              value={formdata.role}
              onChange={handleChange}
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
