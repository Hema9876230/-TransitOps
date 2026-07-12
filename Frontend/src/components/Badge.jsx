import React from "react";

const colorMap = {
  primary: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  secondary: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  success: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  danger: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
  grey: "bg-gray-100 text-gray-600 dark:bg-gray-700/40 dark:text-gray-300",
};

function Badge({ text, color = "grey" }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${colorMap[color] || colorMap.grey}`}
    >
      {text}
    </span>
  );
}

export default Badge;
