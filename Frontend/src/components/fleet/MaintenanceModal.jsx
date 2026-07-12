import React, { useState } from "react";
import Button from "../Button.jsx";
import Input from "../Input.jsx";

function MaintenanceModal({ isOpen, onClose, vehicle }) {
  const [notes, setNotes] = useState("");
  const [serviceDate, setServiceDate] = useState("");

  if (!isOpen || !vehicle) {
    return null;
  }

  const handleClose = () => {
    setNotes("");
    setServiceDate("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-xl glass rounded-2xl p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Maintenance Reminder</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {vehicle.vehicleNumber} - {vehicle.vehicleType}
            </p>
          </div>
          <Button type="button" variant="outline" onClick={handleClose}>Close</Button>
        </div>

        <div className="space-y-4">
          <Input
            label="Next Service Date"
            name="serviceDate"
            type="date"
            value={serviceDate}
            onChange={(e) => setServiceDate(e.target.value)}
          />
          <Input
            label="Repair Notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe pending repair activity"
          />

          <div className="rounded-xl bg-gray-50 dark:bg-gray-800/40 p-3 text-sm text-gray-700 dark:text-gray-200">
            This modal is ready for API integration with service reminder workflows.
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
            <Button type="button" onClick={handleClose}>Save Reminder</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaintenanceModal;
