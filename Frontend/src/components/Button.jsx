import React from "react";

const variantStyles = {
  primary: "bg-[#f59e0b] hover:bg-amber-600 text-white",
  secondary: "bg-[#3b82f6] hover:bg-blue-600 text-white",
  success: "bg-[#22c55e] hover:bg-green-600 text-white",
  danger: "bg-[#ef4444] hover:bg-red-600 text-white",
  outline:
    "bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
};

function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  fullWidth = false,
  className = "cursor-pointer",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${fullWidth ? "w-full" : ""}
        ${variantStyles[variant]}
        px-4 py-2 rounded-xl font-medium text-sm
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
