import express from "express";

import {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} from "../controllers/travelPackageController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllPackages);
router.get("/:id", getPackageById);

// Admin Routes
router.post("/", protect, adminOnly, createPackage);

router.put("/:id", protect, adminOnly, updatePackage);

router.delete("/:id", protect, adminOnly, deletePackage);

export default router;