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
      enum: ["Truck", "Bus", "Van", "Car", "Bike"],
    },

    capacity: {
      type: Number,
      required: true,
    },

    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "CNG", "Electric"],
      required: true,
    },

    mileage: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Available", "On Trip", "Maintenance"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Vehicle", vehicleSchema);