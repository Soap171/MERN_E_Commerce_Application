import express from "express";
import { adminRoute, protectedRoute } from "../middleware/auth.middleware.js";
import { getAnalytics } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", protectedRoute, adminRoute, getAnalytics);

export default router;