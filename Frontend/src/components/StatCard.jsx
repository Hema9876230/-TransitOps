import React from "react";

const accentBar = {
  primary: "bg-[#f59e0b]",
  secondary: "bg-[#3b82f6]",
  success: "bg-[#22c55e]",
  danger: "bg-[#ef4444]",
};

function StatCard({ label, value, change, accent = "primary" }) {
  return (
    <div className="glass rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 relative overflow-hidden">
      <span className={`absolute left-0 top-0 h-full w-1 ${accentBar[accent]}`} />
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <h3 className="text-2xl font-semibold mt-1 text-gray-900 dark:text-white">{value}</h3>
      {change && <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{change}</p>}
    </div>
  );
}

export default StatCard;
