import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    experience: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Available", "On Trip", "Off Duty"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Driver", driverSchema);