import express from "express";
import {
  addFuel,
  getFuels,
  updateFuel,
  deleteFuel,
} from "../controllers/fuelController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addFuel);
router.get("/", protect, getFuels);
router.put("/:id", protect, updateFuel);
router.delete("/:id", protect, deleteFuel);

export default router;