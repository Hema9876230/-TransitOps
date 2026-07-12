import React from "react";

const KPIcard = ({ title, value, color }) => {
  return (
    <div
      className={`rounded-xl border ${color} bg-white dark:bg-[#161b22] shadow-sm hover:shadow-lg transition-all duration-300 p-4 
      `}
    >
      <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
        {value}
      </h2>
    </div>
  );
};

export default KPIcard;
