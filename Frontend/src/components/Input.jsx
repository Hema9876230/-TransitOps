import React from "react";

function Input({ label, type = "text", value, onChange, placeholder = "", required = false, icon: Icon }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={16} />
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full ${Icon ? "pl-9" : "pl-3"} pr-3 py-2 rounded-xl text-sm
            bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
            text-gray-900 dark:text-gray-100 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent
            transition-colors duration-200
          `}
        />
      </div>
    </div>
  );
}

export default Input;
