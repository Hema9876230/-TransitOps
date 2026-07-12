import mongoose from "mongoose";

const fuelSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    fuelType: {
      type: String,
      enum: ["Diesel", "Petrol", "CNG", "Electric"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    cost: {
      type: Number,
      required: true,
    },

    odometer: {
      type: Number,
      required: true,
    },

    station: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Fuel", fuelSchema);