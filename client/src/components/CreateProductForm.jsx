import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import imageCompression from "browser-image-compression";

function CreateProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createProduct, updateProduct, fetchProductById, product, loading } =
    useProductStore();
  const categories = [
    "shoes",
    "t-shirts",
    "glasses",
    "jackets",
    "trousers",
    "bags",
  ];
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
    quantity: 0,
  });

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  useEffect(() => {
    if (product && id) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images,
        category: product.category,
        quantity: product.quantity,
      });
    }
  }, [product, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
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

    setFormData({
      ...formData,
      images: [...formData.images, ...compressedImages.filter(Boolean)],
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const validateForm = () => {
    if (!formData.name) {
      toast.error("Product name is required");
      return false;
    }
    if (!formData.description) {
      toast.error("Product description is required");
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      toast.error("Product price must be greater than zero");
      return false;
    }
    if (!formData.category) {
      toast.error("Product category is required");
      return false;
    }
    if (formData.images.length === 0) {
      toast.error("At least one product image is required");
      return false;
    }
    if (formData.images.length > 7) {
      toast.error("You can only upload a maximum of 7 images");
      return false;
    }
    if (!formData.quantity) {
      toast.error("Product quantity is required");
      return false;
    }
    if (formData.quantity <= 0) {
      toast.error("Product quantity must be greater than zero");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (id) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }
      navigate("/dashboard/products");
    }
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-emerald-300">
        {id ? "Update Product" : "Create New Product"}
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
            value={formData.name}
            onChange={handleChange}
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
            value={formData.description}
            onChange={handleChange}
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
            value={formData.price}
            onChange={handleChange}
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
            value={formData.quantity}
            onChange={handleChange}
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
            value={formData.category}
            onChange={handleChange}
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
            onChange={handleFileChange}
          />
          <label
            htmlFor="images"
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <FaCloudUploadAlt className="h-5 w-5 inline-block mr-2" />
            Upload Images
          </label>
          {formData.images.length > 0 && (
            <span className="ml-3 text-sm text-gray-400">
              {formData.images.length} images uploaded
            </span>
          )}
        </div>

        {formData.images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            {formData.images.map((image, index) => (
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
              {id ? "Update Product" : "Create Product"}
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default CreateProductForm;
