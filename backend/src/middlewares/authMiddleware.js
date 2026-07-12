import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    const token =
      req.cookies?.transitOps ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! No token found",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! User not found",
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};