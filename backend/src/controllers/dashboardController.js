import Vehicle from "../models/vehicleModel.js";
import Driver from "../models/driverModel.js";
import Trip from "../models/tripModel.js";

export const getDashboardStats = async (req, res) => {
  try {

    const totalVehicles = await Vehicle.countDocuments();

    const availableVehicles = await Vehicle.countDocuments({
      status: "Available",
    });

    const onTripVehicles = await Vehicle.countDocuments({
      status: "On Trip",
    });

    const maintenanceVehicles = await Vehicle.countDocuments({
      status: "Maintenance",
    });

    const totalDrivers = await Driver.countDocuments();

    const availableDrivers = await Driver.countDocuments({
      status: "Available",
    });

    const activeTrips = await Trip.countDocuments({
      status: "In Transit",
    });

    const completedTrips = await Trip.countDocuments({
      status: "Completed",
    });

    const recentTrips = await Trip.find()
      .populate("vehicle")
      .populate("driver")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,

      stats: {
        totalVehicles,
        availableVehicles,
        onTripVehicles,
        maintenanceVehicles,
        totalDrivers,
        availableDrivers,
        activeTrips,
        completedTrips,
      },

      recentTrips,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};