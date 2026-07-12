import React from "react";

// columns: [{ key, label, render? }]
// rows: array of objects
function Table({ columns = [], rows = [] }) {
  return (
    <div className="glass rounded-2xl overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={row.id || idx}
              className="border-b border-gray-100 dark:border-gray-800/60 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors duration-150"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-200">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-gray-400">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
