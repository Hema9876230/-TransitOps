import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    serviceType: {
      type: String,
      required: true,
    },

    cost: {
      type: Number,
      required: true,
    },

    serviceDate: {
      type: Date,
      required: true,
    },

    nextServiceDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Maintenance", maintenanceSchema);