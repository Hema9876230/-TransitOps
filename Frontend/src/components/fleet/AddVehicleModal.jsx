import React, { useMemo, useState } from "react";
import Input from "../Input.jsx";
import Select from "../Select.jsx";
import Button from "../Button.jsx";
import { createVehicle } from "../../services/vehicleService.js";

const initialForm = {
	vehicleNumber: "",
	vehicleType: "",
	driverName: "",
	route: "",
	status: "",
};

function AddVehicleModal({ isOpen, onClose, onVehicleAdded }) {
	const [form, setForm] = useState(initialForm);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const vehicleTypeOptions = useMemo(
		() => [
			{ label: "Bus", value: "Bus" },
			{ label: "Truck", value: "Truck" },
			{ label: "Van", value: "Van" },
			{ label: "Car", value: "Car" },
		],
		[]
	);

	const statusOptions = useMemo(
		() => [
			{ label: "Active", value: "Active" },
			{ label: "Inactive", value: "Inactive" },
			{ label: "Maintenance", value: "Maintenance" },
		],
		[]
	);

	if (!isOpen) {
		return null;
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleClose = () => {
		setForm(initialForm);
		setError("");
		onClose();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setLoading(true);

		try {
			await createVehicle(form);
			setForm(initialForm);
			await onVehicleAdded();
			onClose();
		} catch (requestError) {
			setError(
				requestError?.response?.data?.message ||
					"Unable to add vehicle. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
			<div className="w-full max-w-2xl rounded-2xl glass p-6">
				<div className="flex items-start justify-between gap-4 mb-4">
					<div>
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add Vehicle</h2>
						<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
							Enter vehicle details to add it to your fleet.
						</p>
					</div>
					<Button type="button" variant="outline" onClick={handleClose} className="px-3 py-2">
						Close
					</Button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Input
							label="Vehicle Number"
							name="vehicleNumber"
							value={form.vehicleNumber}
							onChange={handleChange}
							placeholder="MH12AB1234"
							required
						/>
						<Select
							label="Vehicle Type"
							value={form.vehicleType}
							onChange={(e) => handleChange({ target: { name: "vehicleType", value: e.target.value } })}
							options={vehicleTypeOptions}
							required
						/>
						<Input
							label="Driver Name"
							name="driverName"
							value={form.driverName}
							onChange={handleChange}
							placeholder="Driver name"
							required
						/>
						<Input
							label="Route"
							name="route"
							value={form.route}
							onChange={handleChange}
							placeholder="Depot A - Depot B"
							required
						/>
						<Select
							label="Status"
							value={form.status}
							onChange={(e) => handleChange({ target: { name: "status", value: e.target.value } })}
							options={statusOptions}
							required
						/>
					</div>

					{error && (
						<div className="rounded-xl border border-red-300 bg-red-50 text-red-700 px-3 py-2 text-sm dark:bg-red-500/10 dark:text-red-300 dark:border-red-700/60">
							{error}
						</div>
					)}

					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={handleClose}>
							Cancel
						</Button>
						<Button type="submit" disabled={loading}>
							{loading ? "Saving..." : "Save Vehicle"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddVehicleModal;
