import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";
import { useProductStore } from "../stores/useProductStore";

function SingleProduct() {
  const { loading, product, fetchProductById } = useProductStore();
  const { id } = useParams();

  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-900 to-slate-700">
        <FiLoader className="h-12 w-12 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-white text-lg">Product not found</p>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-6xl w-full bg-gray-800 shadow-lg rounded-lg p-6 md:p-8 mt-6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 text-center mb-6">
          {product.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="rounded-lg w-full h-auto object-cover"
            />
            <div className="absolute top-4 left-4 bg-emerald-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
              {product.isFeatured ? "Featured" : "New Arrival"}
            </div>
          </motion.div>

          {/* Product Info Section */}
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-gray-300">
              <span className="font-semibold">Price:</span>{" "}
              <span className="text-emerald-400">${product.price}</span>
            </p>

            <p className="text-lg md:text-xl text-gray-300">
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>

            <p className="text-lg md:text-xl text-gray-300">
              <span className="font-semibold">Stock:</span>{" "}
              {product.quantity > 0 ? (
                <span className="text-emerald-400">
                  {product.quantity} left
                </span>
              ) : (
                <span className="text-red-500">Out of stock</span>
              )}
            </p>

            <p className="text-lg md:text-xl text-gray-300">
              <span className="font-semibold">Description:</span>{" "}
              {product.description}
            </p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-500 text-gray-900 px-6 py-3 rounded-lg font-semibold w-full md:w-auto"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Related Images */}
      {product.images.length > 1 && (
        <div className="mt-8 w-full max-w-6xl">
          <h3 className="text-2xl font-semibold text-emerald-400 mb-4">
            More Images
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.images.slice(1).map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`Related ${index + 1}`}
                className="rounded-lg object-cover w-full h-40"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default SingleProduct;
