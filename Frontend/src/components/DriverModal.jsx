import DriverForm from "./DriverForm";

export default function DriverModal({
  open,
  onClose,
  selectedDriver,
  onSubmit,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-xl shadow-xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            {selectedDriver ? "Edit Driver" : "Add Driver"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold hover:text-red-500"
          >
            ×
          </button>

        </div>

        <DriverForm
          selectedDriver={selectedDriver}
          onSubmit={onSubmit}
          onCancel={onClose}
        />

      </div>

    </div>
  );
}