import express from "express";

import {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { validate } from "../middleware/validate.js";
import { bookingSchema } from "../validations/bookingValidation.js";

const router = express.Router();

// CREATE BOOKING
router.post("/", protect, validate(bookingSchema), createBooking);

// USER BOOKINGS
router.get("/my", protect, getMyBookings);

// ADMIN: ALL BOOKINGS
router.get("/", protect, adminOnly, getAllBookings);

// ADMIN: UPDATE STATUS
router.put("/:id", protect, adminOnly, updateBookingStatus);

export default router;