import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiTruck,
  FiUsers,
  FiMap,
  FiTool,
  FiDroplet,
  FiBarChart2,
  FiSettings,
  FiX,
} from "react-icons/fi";

const navItems = [
  { label: "Dashboard", icon: FiGrid, path: "/dashboard" },
  { label: "Fleet", icon: FiTruck, path: "/dashboard/fleet" },
  { label: "Drivers", icon: FiUsers, path: "/dashboard/drivers" },
  { label: "Trips", icon: FiMap, path: "/dashboard/trips" },
  { label: "Maintenance", icon: FiTool, path: "/dashboard/maintenance" },
  {
    label: "Fuel & Expenses",
    icon: FiDroplet,
    path: "/dashboard/fuel-expenses",
  },
  { label: "Analytics", icon: FiBarChart2, path: "/dashboard/analytics" },
  { label: "Settings", icon: FiSettings, path: "/dashboard/settings" },
];

function NavItems({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1 mt-4">
      {navItems.map(({ label, icon: Icon, path }) => (
        <NavLink
          key={label}
          to={path}
          end={path === "/dashboard"}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "bg-[#f59e0b]/10 text-[#f59e0b]"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

// Desktop: fixed sidebar. Mobile: slide-over drawer controlled by isOpen/onClose.
function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 h-screen sticky top-0 glass border-r border-gray-200/60 dark:border-gray-800/60 px-3 py-5">
        <div>
          <span className="font-semibold text-lg text-gray-800 dark:text-white">
            TransistOps
          </span>
        </div>
        <NavItems />
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/40" onClick={onClose} />
          <aside className="relative w-64 h-full glass px-3 py-5 z-50">
            <div className="flex items-center justify-between px-2">
              <div>
                <span className="font-semibold text-lg text-gray-800 dark:text-white">
                  TransistOps
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 dark:text-gray-300"
              >
                <FiX size={20} />
              </button>
            </div>
            <NavItems onNavigate={onClose} />
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;
