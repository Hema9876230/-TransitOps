import { useState } from "react";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "9876543210",
    company: "TransitOps",
    address: "Bhopal, India",
  });

  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    alert("Profile updated successfully!");
  };

  const changePassword = () => {
    if (password.newPassword !== password.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password changed successfully!");
  };

  return (
    <div className="p-6 space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500">
          Manage your account and application preferences.
        </p>
      </div>

      {/* Profile */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-5">
          Profile Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            placeholder="Full Name"
            className="border rounded-lg p-3"
          />

          <input
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            placeholder="Email"
            className="border rounded-lg p-3"
          />

          <input
            name="phone"
            value={profile.phone}
            onChange={handleProfileChange}
            placeholder="Phone"
            className="border rounded-lg p-3"
          />

          <input
            name="company"
            value={profile.company}
            onChange={handleProfileChange}
            placeholder="Company"
            className="border rounded-lg p-3"
          />

        </div>

        <textarea
          name="address"
          value={profile.address}
          onChange={handleProfileChange}
          rows="3"
          className="border rounded-lg p-3 w-full mt-4"
          placeholder="Company Address"
        />

        <button
          onClick={saveProfile}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Save Changes
        </button>

      </div>

      {/* Security */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-5">
          Change Password
        </h2>

        <div className="grid gap-4">

          <input
            type="password"
            name="current"
            value={password.current}
            onChange={handlePasswordChange}
            placeholder="Current Password"
            className="border rounded-lg p-3"
          />

          <input
            type="password"
            name="newPassword"
            value={password.newPassword}
            onChange={handlePasswordChange}
            placeholder="New Password"
            className="border rounded-lg p-3"
          />

          <input
            type="password"
            name="confirmPassword"
            value={password.confirmPassword}
            onChange={handlePasswordChange}
            placeholder="Confirm Password"
            className="border rounded-lg p-3"
          />

        </div>

        <button
          onClick={changePassword}
          className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Change Password
        </button>

      </div>

      {/* Preferences */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-5">
          Preferences
        </h2>

        <div className="space-y-4">

          <label className="flex justify-between">
            <span>Dark Mode</span>
            <input type="checkbox" />
          </label>

          <label className="flex justify-between">
            <span>Email Notifications</span>
            <input type="checkbox" defaultChecked />
          </label>

          <label className="flex justify-between">
            <span>SMS Notifications</span>
            <input type="checkbox" />
          </label>

        </div>

      </div>

      {/* Danger Zone */}

      <div className="bg-red-50 border border-red-200 rounded-xl p-6">

        <h2 className="text-xl font-semibold text-red-600">
          Danger Zone
        </h2>

        <p className="text-gray-600 mt-2">
          These actions cannot be undone.
        </p>

        <div className="flex gap-4 mt-5">

          <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg">
            Delete Account
          </button>

          <button className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg">
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}