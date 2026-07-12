import VehicleForm from "./VehicleForm";

export default function VehicleModal({
  open,
  onClose,
  selectedVehicle,
  onSubmit,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-6">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">
            {selectedVehicle ? "Edit Vehicle" : "Add Vehicle"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>
        </div>

        <VehicleForm
          selectedVehicle={selectedVehicle}
          onSubmit={onSubmit}
          onCancel={onClose}
        />

      </div>
    </div>
  );
}