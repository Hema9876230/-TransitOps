import React from "react";
import Button from "../Button.jsx";

const statusClassMap = {
	Active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
	Inactive: "bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300",
	Maintenance: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

function VehicleRow({ vehicle, onEdit, onDelete, onView }) {
	return (
		<tr className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
			<td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
				{vehicle.vehicleNumber}
			</td>
			<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{vehicle.vehicleType}</td>
			<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{vehicle.driverName}</td>
			<td className="px-4 py-3 text-sm">
				<span
					className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
						statusClassMap[vehicle.status] || statusClassMap.Inactive
					}`}
				>
					{vehicle.status}
				</span>
			</td>
			<td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{vehicle.route}</td>
			<td className="px-4 py-3">
				<div className="flex justify-end gap-2">
					{onView && (
						<Button type="button" variant="secondary" className="px-3 py-1.5" onClick={() => onView(vehicle)}>
							Details
						</Button>
					)}
					<Button type="button" variant="outline" className="px-3 py-1.5" onClick={() => onEdit(vehicle)}>
						Edit
					</Button>
					<Button type="button" variant="danger" className="px-3 py-1.5" onClick={() => onDelete(vehicle)}>
						Delete
					</Button>
				</div>
			</td>
		</tr>
	);
}

export default VehicleRow;
