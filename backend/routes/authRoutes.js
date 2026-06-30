import express from "express";

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

const router = express.Router();

// REGISTER (with validation)
router.post("/register", validate(registerSchema), registerUser);

// LOGIN (with validation)
router.post("/login", validate(loginSchema), loginUser);

// GET CURRENT USER (protected route)
router.get("/me", protect, getMe);

export default router;