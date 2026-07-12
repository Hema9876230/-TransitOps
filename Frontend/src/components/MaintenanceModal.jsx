import MaintenanceForm from "./MaintenanceForm";

export default function MaintenanceModal({
  open,
  selectedMaintenance,
  onSubmit,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-3xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {selectedMaintenance
              ? "Edit Maintenance"
              : "Add Maintenance"}
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-red-500"
          >
            ×
          </button>

        </div>

        {/* Form */}

        <MaintenanceForm
          selectedMaintenance={selectedMaintenance}
          onSubmit={onSubmit}
          onCancel={onClose}
        />

      </div>

    </div>
  );
}