import express from "express";

import {
  createTrip,
  getTrips,
  getTripById,
  deleteTrip,
  updateTrip,
} from "../controllers/tripController.js";

import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { tripSchema } from "../validations/tripValidation.js";

const router = express.Router();

router.get("/", protect, getTrips);
router.get("/:id", protect, getTripById);

router.post("/", protect, validate(tripSchema), createTrip);
router.put("/:id", protect, validate(tripSchema), updateTrip);

router.delete("/:id", protect, deleteTrip);

export default router;