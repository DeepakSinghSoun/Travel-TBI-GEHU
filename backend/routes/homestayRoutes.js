import express from "express";
import {
  getHomestays,
  getHomestayById,
  createHomestay,
} from "../controllers/homestayController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getHomestays);

// GET SINGLE HOMESTAY
router.get("/:id", getHomestayById);

// CREATE (PROTECTED - TEMP, NOT REAL ADMIN YET)
router.post("/", protect, adminOnly, createHomestay);

export default router;