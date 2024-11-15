import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useProductStore } from "../stores/useProductStore";
import imageCompression from "browser-image-compression";

function CreateProductForm() {
  const { createProduct, loading } = useProductStore();
  const categories = [
    "shoes",
    "t-shirts",
    "glasses",
    "jackets",
    "trousers",
    "bags",
  ];
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
    quantity: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        images: [],
        quantity: 0,
      });
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const compressedImages = await Promise.all(
      files.map(async (file) => {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(file, options);
          const reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          return new Promise((resolve) => {
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
        } catch (error) {
          console.error("Error compressing image:", error);
          return null;
        }
      })
    );

    setNewProduct({
      ...newProduct,
      images: [...newProduct.images, ...compressedImages.filter(Boolean)],
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = newProduct.images.filter((_, i) => i !== index);
    setNewProduct({ ...newProduct, images: updatedImages });
  };

  const validateForm = () => {
    if (!newProduct.name) {
      toast.error("Product name is required");
      return false;
    }
    if (!newProduct.description) {
      toast.error("Product description is required");
      return false;
    }
    if (!newProduct.price || newProduct.price <= 0) {
      toast.error("Product price must be greater than zero");
      return false;
    }
    if (!newProduct.category) {
      toast.error("Product category is required");
      return false;
    }
    if (newProduct.images.length === 0) {
      toast.error("At least one product image is required");
      return false;
    }
    if (newProduct.images.length > 7) {
      toast.error("You can only upload a maximum of 7 images");
      return false;
    }
    if (!newProduct.quantity) {
      toast.error("Product quantity is required");
      return false;
    }
    if (newProduct.quantity <= 0) {
      toast.error("Product quantity must be greater than zero");
      return false;
    }
    return true;
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-emerald-300">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            rows="3"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-300"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            step="0.01"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-300"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity: e.target.value })
            }
            step="1"
            min="0"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="images"
            className="sr-only"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <label
            htmlFor="images"
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <FaCloudUploadAlt className="h-5 w-5 inline-block mr-2" />
            Upload Images
          </label>
          {newProduct.images.length > 0 && (
            <span className="ml-3 text-sm text-gray-400">
              {newProduct.images.length} images uploaded
            </span>
          )}
        </div>

        {newProduct.images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            {newProduct.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-auto rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => handleRemoveImage(index)}
                >
                  <FaTrashAlt className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <FiLoader
                className="mr-2 h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            <>
              <IoMdAddCircle className="mr-2 h-5 w-5" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default CreateProductForm;
