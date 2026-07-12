import TripForm from "./TripForm";

export default function TripModal({
  open,
  selectedTrip,
  onSubmit,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-full max-w-2xl p-6">

        <div className="flex justify-between mb-5">

          <h2 className="text-2xl font-bold">
            {selectedTrip ? "Edit Trip" : "Create Trip"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>

        </div>

        <TripForm
          selectedTrip={selectedTrip}
          onSubmit={onSubmit}
          onCancel={onClose}
        />

      </div>

    </div>
  );
}