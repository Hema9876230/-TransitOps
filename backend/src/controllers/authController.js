import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { genToken } from "../utils/authToken.js";

const allowedRoles = new Set([
  "fleet_manager",
  "dispatcher",
  "driver",
  "maintenance",
  "safety_officer",
  "financial_analyst",
  "admin",
]);

export const UserRegister = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const normalizedName = name?.trim();
    const normalizedEmail = email?.trim().toLowerCase();
    const normalizedRole = role?.trim();

    if (!normalizedName || !normalizedEmail || !password || !normalizedRole) {
      const error = new Error("All Field Required");
      error.statusCode = 400;
      return next(error);
    }

    if (!allowedRoles.has(normalizedRole)) {
      const error = new Error("Please select a valid role");
      error.statusCode = 400;
      return next(error);
    }

    if (password.length < 8) {
      const error = new Error("Password must be at least 8 characters long");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashPassword,
      role: normalizedRole,
    });

    const user = newUser.toObject();
    delete user.password;

    const token = genToken(newUser, res);
    res.status(201).json({ message: "Registration Successfull !", user, token });
  } catch (error) {
    next(error);
  }
};

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      const error = new Error("All Field Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (!existingUser) {
      const error = new Error("User not registered");
      error.statusCode = 401;
      return next(error);
    }

    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new Error("Password didn't match");
      error.statusCode = 401;
      return next(error);
    }

    const token = genToken(existingUser, res);
    const user = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };

    res.status(200).json({ message: "Login Successfull !", token, user });
  } catch (error) {
    next(error);
  }
};

export const UserLogout = async (req, res, next) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("transitOps", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    next(error);
  }
};
