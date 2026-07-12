// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// export const Protect = async (req, res, next) => {
//   try {
//     const token = req.cookies.transitOps || req.headers.authorization?.replace("Bearer ", "");

//     if (!token) {
//       const error = new Error("Unauthorized! No token found");
//       error.statusCode = 401;
//       return next(error);
//     }

//     const decode = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decode) {
//       const error = new Error("Unauthorized! Please Login Again");
//       error.statusCode = 401;
//       return next(error);
//     }

//     const verifiedUser = await User.findById(decode.id);
//     if (!verifiedUser) {
//       const error = new Error("Unauthorized! Please Login Again");
//       error.statusCode = 401;
//       return next(error);
//     }
//     req.user = verifiedUser;

//     next();
//   } catch (error) {
//     next(error);
//   }
// };

import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // ==========================
    // Get Token From Cookie
    // ==========================
    if (req.cookies?.transitOps) {
      token = req.cookies.transitOps;
    }

    // ==========================
    // Get Token From Authorization Header
    // ==========================
    if (
      !token &&
      req.headers.authorization?.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      const error = new Error("Unauthorized! Please login first.");
      error.statusCode = 401;
      return next(error);
    }

    // ==========================
    // Verify Token
    // ==========================
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ==========================
    // Find User
    // ==========================
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 401;
      return next(error);
    }

    // Optional (if you have status field)
    if (user.status === "Inactive") {
      const error = new Error("Your account has been deactivated.");
      error.statusCode = 403;
      return next(error);
    }

    req.user = user;

    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};