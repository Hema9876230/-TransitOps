import Vehicle from "../models/vehicleModel.js";

// Create Vehicle
export const addVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);

    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Vehicles
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Vehicle
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.json({
      success: true,
      vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Vehicle
export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.json({
      success: true,
      message: "Vehicle updated successfully",
      vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    await vehicle.deleteOne();

    res.json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};