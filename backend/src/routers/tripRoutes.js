import express from "express";

import {
  createTrip,
  getTrips,
  updateTrip,
  completeTrip,
  deleteTrip,
} from "../controllers/tripController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTrip);

router.get("/", protect, getTrips);

router.put("/:id", protect, updateTrip);

router.put("/complete/:id", protect, completeTrip);

router.delete("/:id", protect, deleteTrip);

export default router;