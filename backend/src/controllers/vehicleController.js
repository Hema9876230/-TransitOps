import asyncHandler from "express-async-handler";
import Vehicle from "../models/Vehicle.js";

/* ============================================================
   @desc    Create Vehicle
   @route   POST /api/vehicles
   @access  Private (Admin / Fleet Manager)
============================================================ */

export const createVehicle = asyncHandler(async (req, res) => {
  const {
    vehicleNumber,
    registrationNumber,
    manufacturer,
    model,
    vehicleType,
    capacity,
    fuelType,
    currentOdometer,
    driver,
    status,
    insuranceExpiry,
    pollutionExpiry,
    fitnessExpiry,
    lastServiceDate,
    nextServiceDate,
    vehicleImage,
  } = req.body;

  const existingVehicle = await Vehicle.findOne({
    $or: [
      { vehicleNumber: vehicleNumber.toUpperCase() },
      { registrationNumber: registrationNumber.toUpperCase() },
    ],
  });

  if (existingVehicle) {
    return res.status(400).json({
      success: false,
      message:
        "Vehicle Number or Registration Number already exists.",
    });
  }

  const vehicle = await Vehicle.create({
    vehicleNumber,
    registrationNumber,
    manufacturer,
    model,
    vehicleType,
    capacity,
    fuelType,
    currentOdometer,
    driver,
    status,
    insuranceExpiry,
    pollutionExpiry,
    fitnessExpiry,
    lastServiceDate,
    nextServiceDate,
    vehicleImage,
    createdBy: req.user._id,
  });

  const populatedVehicle = await Vehicle.findById(vehicle._id)
    .populate("driver", "name email")
    .populate("createdBy", "name");

  res.status(201).json({
    success: true,
    message: "Vehicle created successfully.",
    vehicle: populatedVehicle,
  });
});

/* ============================================================
   @desc    Get All Vehicles
   @route   GET /api/vehicles
   @access  Private
============================================================ */

export const getAllVehicles = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const keyword = req.query.search
    ? {
        $or: [
          {
            vehicleNumber: {
              $regex: req.query.search,
              $options: "i",
            },
          },
          {
            registrationNumber: {
              $regex: req.query.search,
              $options: "i",
            },
          },
          {
            manufacturer: {
              $regex: req.query.search,
              $options: "i",
            },
          },
          {
            model: {
              $regex: req.query.search,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const statusFilter = req.query.status
    ? { status: req.query.status }
    : {};

  const typeFilter = req.query.vehicleType
    ? { vehicleType: req.query.vehicleType }
    : {};

  const filter = {
    isDeleted: false,
    ...keyword,
    ...statusFilter,
    ...typeFilter,
  };

  const totalVehicles = await Vehicle.countDocuments(filter);

  const vehicles = await Vehicle.find(filter)
    .populate("driver", "name email")
    .populate("createdBy", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    page,
    totalPages: Math.ceil(totalVehicles / limit),
    totalVehicles,
    count: vehicles.length,
    vehicles,
  });
});

/* ============================================================
   @desc    Get Single Vehicle
   @route   GET /api/vehicles/:id
   @access  Private
============================================================ */

export const getVehicleById = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id)
    .populate("driver", "name email")
    .populate("createdBy", "name");

  if (!vehicle || vehicle.isDeleted) {
    return res.status(404).json({
      success: false,
      message: "Vehicle not found.",
    });
  }

  res.status(200).json({
    success: true,
    vehicle,
  });
});

/* ============================================================
   @desc    Update Vehicle
   @route   PUT /api/vehicles/:id
   @access  Private
============================================================ */

export const updateVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle || vehicle.isDeleted) {
    return res.status(404).json({
      success: false,
      message: "Vehicle not found.",
    });
  }

  Object.assign(vehicle, req.body);

  await vehicle.save();

  const updatedVehicle = await Vehicle.findById(vehicle._id)
    .populate("driver", "name email")
    .populate("createdBy", "name");

  res.status(200).json({
    success: true,
    message: "Vehicle updated successfully.",
    vehicle: updatedVehicle,
  });
});

/* ============================================================
   @desc    Delete Vehicle (Soft Delete)
   @route   DELETE /api/vehicles/:id
   @access  Private
============================================================ */

export const deleteVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle || vehicle.isDeleted) {
    return res.status(404).json({
      success: false,
      message: "Vehicle not found.",
    });
  }

  vehicle.isDeleted = true;

  await vehicle.save();

  res.status(200).json({
    success: true,
    message: "Vehicle deleted successfully.",
  });
});