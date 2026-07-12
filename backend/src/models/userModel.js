import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
      name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["fleet_manager","dispatcher","driver","maintenance","safety_officer","financial_amalyst", "admin"],
      default: "user",
    },
  },

  { timestamps: true },
);

export default mongoose.model("User", userSchema);
