import express from "express";

import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("Admin", "Fleet Manager"),
  createVehicle
);


router.get("/", protect, getAllVehicles);

router.get("/:id", protect, getVehicleById);


router.put(
  "/:id",
  protect,
  authorizeRoles("Admin", "Fleet Manager"),
  updateVehicle
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("Admin"),
  deleteVehicle
);

export default router;