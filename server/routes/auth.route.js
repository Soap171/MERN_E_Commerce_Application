import express from "express";
import {
  login,
  signup,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  google,
  refreshToken,
  getProfile,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/google-auth", google);

// profile
router.get("/profile", getProfile);

export default router;
