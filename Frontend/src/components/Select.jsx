import React from "react";

function Select({ label, value, onChange, options = [], required = false }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="
          w-full px-3 py-2 rounded-xl text-sm
          bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
          text-gray-900 dark:text-gray-100
          focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent
          transition-colors duration-200
        "
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
