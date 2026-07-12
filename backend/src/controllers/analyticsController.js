import Trip from "../models/tripModel.js";
import Vehicle from "../models/vehicleModel.js";
import Driver from "../models/driverModel.js";
import Fuel from "../models/fuelModel.js";
import Maintenance from "../models/maintenanceModel.js";

export const getAnalytics = async (req, res) => {
  try {

    const tripStatus = await Trip.aggregate([
      {
        $group: {
          _id: "$status",
          value: {
            $sum: 1
          }
        }
      }
    ]);

    const vehicleStatus = await Vehicle.aggregate([
      {
        $group: {
          _id: "$status",
          value: {
            $sum: 1
          }
        }
      }
    ]);

    const driverStatus = await Driver.aggregate([
      {
        $group: {
          _id: "$status",
          value: {
            $sum: 1
          }
        }
      }
    ]);

    const fuelCost = await Fuel.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$cost"
          }
        }
      }
    ]);

    const maintenanceCost = await Maintenance.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$cost"
          }
        }
      }
    ]);

    const monthlyTrips = await Trip.aggregate([
      {
        $group: {
          _id: {
            $month: "$createdAt"
          },
          trips: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          "_id": 1
        }
      }
    ]);

    res.json({
      success: true,
      tripStatus,
      vehicleStatus,
      driverStatus,
      fuelCost,
      maintenanceCost,
      monthlyTrips,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};