import { errorHandler } from "../utils/errorHandler.js";
import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      products,
    });
  } catch (error) {
    console.log("Error Inside getAllProducts", error);
    next(error);
  }
};

export const getFreaturedProducts = async (req, res, next) => {
  try {
    // check redis for featured products and if there is return them to client
    let featuredProducts = await redis.get("featuredProducts");
    if (featuredProducts) {
      return res.status(200).json(JSON.parse(featuredProducts));
    }

    // lean() return plain js objects instead of mongoose documents
    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts) {
      return next(errorHandler(404, "Featured Products Not Found"));
    }

    //store the data in redis for future requests
    await redis.set("featuredProducts", JSON.stringify(featuredProducts));
    res.status(200).json({
      featuredProducts,
    });
  } catch (error) {
    console.log("Error Inside getFreaturedProducts", error);
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, category } = req.body;
    if (!name || !description || !price || !image || !category) {
      return next(errorHandler(400, "Please fill all fields"));
    }

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "prodcuts",
      });
    }

    const product = new Product({
      name,
      description,
      price,
      image: cloudinaryResponse.secure_url ? cloudinaryResponse.secure_url : "",
      category,
    });

    await product.save();

    res.status(201).json({ product });
  } catch (error) {
    console.log("Error Inside createProduct", error);
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    if (!id) return next(errorHandler(400, "Product ID is required"));

    const product = await Product.findById(id);

    if (!product) return next(errorHandler(404, "Product Not Found"));

    if (product.image) {
      try {
        const publicId = product.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log("Error Inside deleteProduct", error);
      }
    }

    await product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    console.log("Error Inside deleteProduct", error);
    next(error);
  }
};

export const getRecommendedProducts = async (req, res, next) => {
  try {
    const prodcuts = await Product.aggregate([
      { $sample: { size: 4 } },
      { name: 1, image: 1, description: 1, price: 1 },
    ]);

    if (!prodcuts)
      return next(errorHandler(404, "Recommended Products Not Found"));

    res.status(200).json({
      prodcuts,
    });
  } catch (error) {
    console.log("Error Inside getRecommendedProducts", error);
    next(error);
  }
};

export const getProductsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    if (!category) return next(errorHandler(404, "Category is required"));

    const products = await Product.find({ category });

    if (!products) return next(errorHandler(404, "Products Not Found"));

    res.statu(200).json(products);
  } catch (error) {
    console.log("Error inside getProductsByCategory", error);
    next(error);
  }
};

export const toggleFeatureProduct = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    if (!id) return next(errorHandler(400, "Product ID is required"));

    const product = await Product.findById(id);

    if (!product) return next(errorHandler(404, "Product Not Found"));

    product.isFeatured = !product.isFeatured;
    const updatedProduct = await product.save();
    await updateFeaturedProductsCache();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log("Error Inside toggleFeatureProduct", error);
    next(error);
  }
};

async function updateFeaturedProductsCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();

    await redis.set("featuredProducts", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("Error Inside update featured product in redis cache", error);
  }
}