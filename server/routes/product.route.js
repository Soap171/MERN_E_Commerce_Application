import express from "express";
import {
  getAllProducts,
  getFreaturedProducts,
  createProduct,
  deleteProduct,
  getRecommendedProducts,
  getProductsByCategory,
  toggleFeatureProduct,
} from "../controllers/product.controller.js";
import { protectedRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectedRoute, adminRoute, getAllProducts);
router.get("/featured", getFreaturedProducts);
router.get("/recommended", getRecommendedProducts);
router.get("/category/:category", getProductsByCategory);
router.post("/", protectedRoute, adminRoute, createProduct);
router.delete("/:id", protectedRoute, adminRoute, deleteProduct);
router.patch("/:id", protectedRoute, adminRoute, toggleFeatureProduct);
export default router;