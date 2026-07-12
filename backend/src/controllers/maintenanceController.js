import Maintenance from "../models/maintenanceModel.js";

// Add
export const addMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.create(req.body);

    res.status(201).json({
      success: true,
      maintenance,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get
export const getMaintenances = async (req, res) => {
  try {
    const maintenances = await Maintenance.find()
      .populate("vehicle")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      maintenances,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update
export const updateMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      maintenance,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete
export const deleteMaintenance = async (req, res) => {
  try {
    await Maintenance.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Maintenance deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};