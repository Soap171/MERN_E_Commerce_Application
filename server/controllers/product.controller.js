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
    const { name, description, price, images, category, quantity } = req.body;
    if (!name || !description || !price || !images || !category || !quantity) {
      return next(errorHandler(400, "Please fill all fields"));
    }

    if (!Array.isArray(images) || images.length === 0) {
      return next(errorHandler(400, "Please provide at least one image"));
    }

    // Compress and upload images concurrently
    const imageUploadPromises = images.map(async (image) => {
      const buffer = Buffer.from(image.split(",")[1], "base64");
      const compressedBuffer = await sharp(buffer)
        .resize(800) // Resize to a width of 800px, maintaining aspect ratio
        .jpeg({ quality: 80 }) // Compress to JPEG with 80% quality
        .toBuffer();

      const compressedImage = `data:image/jpeg;base64,${compressedBuffer.toString(
        "base64"
      )}`;
      return cloudinary.uploader.upload(compressedImage, {
        folder: "products",
      });
    });

    const cloudinaryResponses = await Promise.all(imageUploadPromises);
    const imageUrls = cloudinaryResponses.map(
      (response) => response.secure_url
    );

    const product = new Product({
      name,
      description,
      price,
      images: imageUrls,
      category,
      quantity,
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
    const { id } = req.params;
    if (!id) return next(errorHandler(400, "Product ID is required"));

    const product = await Product.findById(id);

    if (!product) return next(errorHandler(404, "Product Not Found"));

    if (product.images && product.images.length > 0) {
      try {
        // Use Promise.all to delete images concurrently
        const imageDeletePromises = product.images.map((image) => {
          const publicId = image.split("/").pop().split(".")[0];
          return cloudinary.uploader.destroy(publicId);
        });
        await Promise.all(imageDeletePromises);
      } catch (error) {
        console.log("Error Inside deleteProduct", error);
      }
    }

    await Product.findByIdAndDelete(id);
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
    const { id } = req.params;
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

export const getProductById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(errorHandler(400, "Product ID is required"));

  try {
    const product = await Product.findById(id);
    if (!product) return next(errorHandler(404, "Product Not Found"));

    res.status(200).json(product);
  } catch (error) {
    console.log("Error Inside getProductById", error);
    next;
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, images, category, quantity } = req.body;

  if (!id) return next(errorHandler(400, "Product ID is required"));
  if (!name || !description || !price || !category || !quantity) {
    return next(errorHandler(400, "Please fill all fields"));
  }

  try {
    const product = await Product.findById(id);
    if (!product) return next(errorHandler(404, "Product Not Found"));

    let imageUrls = product.images;

    // If new images are provided, compress and upload them
    if (images && Array.isArray(images) && images.length > 0) {
      const imageUploadPromises = images.map(async (image) => {
        const buffer = Buffer.from(image.split(",")[1], "base64");
        const compressedBuffer = await sharp(buffer)
          .resize(800) // Resize to a width of 800px, maintaining aspect ratio
          .jpeg({ quality: 80 }) // Compress to JPEG with 80% quality
          .toBuffer();

        const compressedImage = `data:image/jpeg;base64,${compressedBuffer.toString(
          "base64"
        )}`;
        return cloudinary.uploader.upload(compressedImage, {
          folder: "products",
        });
      });

      const cloudinaryResponses = await Promise.all(imageUploadPromises);
      const newImageUrls = cloudinaryResponses.map(
        (response) => response.secure_url
      );

      // Combine old and new image URLs
      imageUrls = [...imageUrls, ...newImageUrls];
    }

    // Update product details
    product.name = name;
    product.description = description;
    product.price = price;
    product.images = imageUrls;
    product.category = category;
    product.quantity = quantity;

    await product.save();

    res.status(200).json({ product });
  } catch (error) {
    console.log("Error Inside updateProduct", error);
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
