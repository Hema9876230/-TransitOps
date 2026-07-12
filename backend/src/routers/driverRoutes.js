import express from "express";

import {
  addDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} from "../controllers/driverController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addDriver);

router.get("/", protect, getDrivers);

router.get("/:id", protect, getDriverById);

router.put("/:id", protect, updateDriver);

router.delete("/:id", protect, deleteDriver);

export default router;