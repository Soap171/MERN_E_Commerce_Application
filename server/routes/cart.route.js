import express from "express";
import {
  getCartProducts,
  removeAllProductsFromCart,
  updateProductQuantity,
  addProductToCart,
} from "../controllers/cart.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectedRoute, getCartProducts);
router.post("/", protectedRoute, addProductToCart);
router.put("/:id", protectedRoute, updateProductQuantity);
router.delete("/", protectedRoute, removeAllProductsFromCart);

export default router;
