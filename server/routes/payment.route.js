import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  createCeckoutSession,
  createNewOrder,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", protectedRoute, createCeckoutSession);
router.post("/checkout-success", protectedRoute, createNewOrder);

export default router;
