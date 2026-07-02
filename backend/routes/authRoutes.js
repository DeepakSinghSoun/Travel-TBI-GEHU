// throw new Error("AUTH ROUTES FILE LOADED");

import express from "express";
import rateLimit from "express-rate-limit";

import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import {
  registerSchema,
  loginSchema,
} from "../validations/authValidation.js"; // FIXED PATH

// Rate limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests, try again later",
});

const router = express.Router();

// REGISTER (with validation)
router.post("/register", validate(registerSchema), registerUser);

// LOGIN (with validation)
router.post("/login", validate(loginSchema), loginUser);

// GET CURRENT USER (protected route)
router.get("/me", protect, getMe);

export default router;