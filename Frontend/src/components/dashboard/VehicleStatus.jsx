import React from "react";
import { vehicleStatus } from "../../data/dashboardData";

const VehicleStatus = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 dark:border-gray-700 dark:bg-[#161b22]">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-base font-semibold text-gray-800 sm:text-lg dark:text-white">
          Vehicle Status
        </h2>

        <p className="mt-1 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
          Fleet availability overview
        </p>
      </div>

      {/* Progress Items */}
      <div className="space-y-5 sm:space-y-6">
        {vehicleStatus.map((item) => (
          <div key={item.label}>
            {/* Label */}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700 sm:text-sm dark:text-gray-300">
                {item.label}
              </span>

              <span className="text-xs font-semibold text-gray-900 sm:text-sm dark:text-white">
                {item.value}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200 sm:h-3 dark:bg-gray-700">
              <div
                className={`${item.color} h-full rounded-full transition-all duration-700`}
                style={{
                  width: `${item.value}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 sm:mt-8">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
            Total Fleet
          </span>

          <span className="text-lg font-bold text-gray-900 sm:text-2xl dark:text-white">
            58
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
          <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <p className="text-[11px] text-green-600 sm:text-xs dark:text-green-400">
              Operational
            </p>

            <h3 className="mt-1 text-xl font-bold text-green-700 sm:text-2xl dark:text-green-300">
              47
            </h3>
          </div>

          <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
            <p className="text-[11px] text-amber-600 sm:text-xs dark:text-amber-400">
              Service
            </p>

            <h3 className="mt-1 text-xl font-bold text-amber-700 sm:text-2xl dark:text-amber-300">
              11
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleStatus;
