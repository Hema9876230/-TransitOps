import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

function ThemeToggle({ theme, setTheme }) {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        p-2 rounded-xl glass hover:bg-gray-100 dark:hover:bg-gray-800
        transition-colors duration-200 text-gray-600 dark:text-gray-300
      "
    >
      {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
    </button>
  );
}

export default ThemeToggle;
