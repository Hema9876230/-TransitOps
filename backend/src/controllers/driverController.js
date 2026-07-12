import Driver from "../models/driverModel.js";

// Add Driver
export const addDriver = async (req, res) => {
  try {
    const driver = await Driver.create(req.body);

    res.status(201).json({
      success: true,
      message: "Driver added successfully",
      driver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Drivers
export const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      drivers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Driver by ID
export const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.json({
      success: true,
      driver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Driver
export const updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.json({
      success: true,
      message: "Driver updated successfully",
      driver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Driver
export const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    await driver.deleteOne();

    res.json({
      success: true,
      message: "Driver deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};