import Trip from "../models/tripModel.js";
import Vehicle from "../models/vehicleModel.js";
import Driver from "../models/driverModel.js";

// Create Trip
export const createTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);

    await Vehicle.findByIdAndUpdate(req.body.vehicle, {
      status: "On Trip",
    });

    await Driver.findByIdAndUpdate(req.body.driver, {
      status: "On Trip",
    });

    res.status(201).json({
      success: true,
      message: "Trip created successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Trips
export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("vehicle")
      .populate("driver")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      trips,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Trip
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Complete Trip
export const completeTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    trip.status = "Completed";

    await trip.save();

    await Vehicle.findByIdAndUpdate(trip.vehicle, {
      status: "Available",
    });

    await Driver.findByIdAndUpdate(trip.driver, {
      status: "Available",
    });

    res.json({
      success: true,
      message: "Trip Completed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Trip
export const deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Trip Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};