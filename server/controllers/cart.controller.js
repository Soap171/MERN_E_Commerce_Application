import Product from "../models/product.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getCartProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems } });
    if (!products) return next(errorHandler(404, "No products found in cart"));

    // add quantity to each product
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts controller", error);
    next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) return next(errorHandler(400, "Product ID is required"));

    const existingProduct = user.cartItems.find(
      (item) => item.id === productId
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }

    await user.save();
    res.status(201).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.log("Error in addProductToCart controller", error);
    next(error);
  }
};

export const removeAllProductsFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) return next(errorHandler(400, "Product ID is required"));
    user.cartItems = user.cartItems.filter((item) => item.id !== productId);

    await user.save();
    res.status(200).json({ message: "All products removed from cart" });
  } catch (error) {
    console.log("Error in removeAllProductsFromCart controller", error);
    next(error);
  }
};

export const updateProductQuantity = async (req, res, next) => {
  try {
    const { id: productId } = req.params.id;
    const user = req.user;
    if (!productId) return next(errorHandler(400, "Product ID is required"));
    const { quantity } = req.body;
    if (!quantity) return next(errorHandler(400, "Quantity is required"));

    const existingProduct = user.cartItems.find(
      (item) => item.id === productId
    );

    if (!existingProduct)
      return next(errorHandler(404, "Product not found in cart"));

    if (existingProduct) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        await user.save();
        return res.status(200).json(user.cartItems);
      }

      existingProduct.quantity = quantity;
      await user.save();
      res.status(200).json(user.cartItems);
    }
  } catch (error) {
    console.log("Error in updateProductQuantity controller", error);
    next(error);
  }
};
