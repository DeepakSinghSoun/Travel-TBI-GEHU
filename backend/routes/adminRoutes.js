import express from "express";

import {
  getDashboard,
  getAllHomestays,
  createHomestay,
  updateHomestay,
  deleteHomestay,
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

export default router;