import express from "express";

import {
  register,
  verifyEmail,
  resendVerificationOtp,
  login,
  logout,
  getMe,
  updateProfile,
  updateEntrepreneurProfile,
  forgotPassword,
  resetPassword,
  changePassword,
} from "../controllers/authController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ================= AUTHENTICATION ROUTES =================

router.post("/register", register);

router.post("/verify-email", verifyEmail);

router.post("/resend-verification-otp", resendVerificationOtp);



router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.put("/change-password", protect, changePassword);

router.get("/me", protect, getMe);

// ================= CUSTOMER PROFILE ROUTE =================

router.put("/profile", protect, updateProfile);

// ================= ENTREPRENEUR PROFILE ROUTE =================

router.put(
  "/entrepreneur/profile",
  protect,
  updateEntrepreneurProfile
);

export default router;
