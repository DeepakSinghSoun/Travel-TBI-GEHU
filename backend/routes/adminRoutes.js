import express from "express";

import {
  getDashboard,
  getAllHomestays,
  getHomestayById,
  createHomestay,
  updateHomestay,
  deleteHomestay,
  getAllUsers,

  getAllBookings,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// ================= ADMIN DASHBOARD =================
router.get(
  "/dashboard",
  protect,
  adminOnly,
  getDashboard
);

// ================= HOMESTAY CRUD =================

// GET ALL HOMESTAYS
router.get(
  "/homestays",
  protect,
  adminOnly,
  getAllHomestays
);

// GET SINGLE HOMESTAY
router.get(
  "/homestays/:id",
  protect,
  adminOnly,
  getHomestayById
);

// CREATE HOMESTAY
router.post(
  "/homestays",
  protect,
  adminOnly,
  createHomestay
);

// UPDATE HOMESTAY
router.put(
  "/homestays/:id",
  protect,
  adminOnly,
  updateHomestay
);

// DELETE HOMESTAY
router.delete(
  "/homestays/:id",
  protect,
  adminOnly,
  deleteHomestay
);

// ================= USER MANAGEMENT =================

// GET ALL USERS
router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);


// ================= BOOKINGS =================

// Get all bookings

router.get(
  "/bookings",
  protect,
  adminOnly,
  getAllBookings
);

// Update booking status

router.put(
  "/bookings/:id",
  protect,
  adminOnly,
  updateBookingStatus
);

// Delete booking

router.delete(
  "/bookings/:id",
  protect,
  adminOnly,
  deleteBooking
);

export default router;