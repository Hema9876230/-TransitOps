import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ["Bus", "Truck", "Van", "Car", "Mini Bus"],
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    fuelType: {
      type: String,
      required: true,
      enum: ["Petrol", "Diesel", "CNG", "Electric"],
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: ["Available", "On Trip", "Maintenance", "Inactive"],
      default: "Available",
    },

    insuranceExpiry: {
      type: Date,
      required: true,
    },

    pollutionExpiry: {
      type: Date,
      required: true,
    },

    fitnessExpiry: {
      type: Date,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;