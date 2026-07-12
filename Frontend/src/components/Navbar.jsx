import React from "react";
import { FiSearch, FiBell, FiMenu } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle.jsx";
import Button from "./Button.jsx";

function Navbar({ user, theme, setTheme, onMenuClick, onLogout }) {
  return (
    <header className="glass sticky top-0 z-30 px-4 py-3 flex items-center justify-between gap-4 border-b border-gray-200/60 dark:border-gray-800/60">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-600 dark:text-gray-300"
          aria-label="Open menu"
        >
          <FiMenu size={22} />
        </button>

        <div className="relative hidden sm:block max-w-xs w-full">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-2 rounded-xl text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition-colors duration-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="relative p-2 rounded-xl glass hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-600 dark:text-gray-300"
        >
          <FiBell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ef4444]" />
        </button>

        <ThemeToggle theme={theme} setTheme={setTheme} />

        <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-800">
          <div className="w-9 h-9 rounded-full bg-[#3b82f6] text-white flex items-center justify-center text-sm font-semibold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-medium text-gray-800 dark:text-white">{user?.name || "Guest"}</p>
            <p className="text-xs text-gray-400">{user?.role || "—"}</p>
          </div>
          {onLogout && (
            <Button variant="outline" onClick={onLogout} className="ml-2 px-3 py-2 text-xs">
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
