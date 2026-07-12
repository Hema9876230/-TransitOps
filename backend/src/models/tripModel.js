import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },

    source: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    distance: {
      type: Number,
      required: true,
    },

    tripDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Scheduled", "In Transit", "Completed", "Cancelled"],
      default: "Scheduled",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Trip", tripSchema);