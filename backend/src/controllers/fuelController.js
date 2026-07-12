import Fuel from "../models/fuelModel.js";

// Add Fuel Entry
export const addFuel = async (req, res) => {
  try {
    const fuel = await Fuel.create(req.body);

    res.status(201).json({
      success: true,
      fuel,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Fuel Entries
export const getFuels = async (req, res) => {
  try {
    const fuels = await Fuel.find()
      .populate("vehicle")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      fuels,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Fuel Entry
export const updateFuel = async (req, res) => {
  try {
    const fuel = await Fuel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      fuel,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Fuel Entry
export const deleteFuel = async (req, res) => {
  try {
    await Fuel.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Fuel entry deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};