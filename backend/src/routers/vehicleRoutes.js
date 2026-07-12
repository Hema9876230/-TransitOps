import express from "express";
import {
  addVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addVehicle);
router.get("/", protect, getVehicles);
router.get("/:id", protect, getVehicleById);
router.put("/:id", protect, updateVehicle);
router.delete("/:id", protect, deleteVehicle);

export default router;