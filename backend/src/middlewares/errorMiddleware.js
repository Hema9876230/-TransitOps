import mongoose from "mongoose";

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // ==========================
  // Invalid MongoDB ObjectId
  // ==========================
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid resource ID.";
  }

  // ==========================
  // Duplicate Key Error
  // ==========================
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    statusCode = 409;
    message = `${field} already exists.`;
  }

  // ==========================
  // Mongoose Validation Error
  // ==========================
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;

    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  // ==========================
  // JWT Errors
  // ==========================
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Session expired. Please login again.";
  }

  // ==========================
  // Final Response
  // ==========================
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};