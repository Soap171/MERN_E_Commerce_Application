import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    try {
      set({ loading: true });

      const { name, description, price, category, images, quantity } =
        productData;

      const response = await axiosInstance.post("/products", {
        name,
        description,
        price,
        category,
        images,
        quantity,
      });

      set((state) => ({
        products: [...state.products, response.data.product],
        loading: false,
      }));
      toast.success("Product created successfully");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Error creating product");
      set({ loading: false });
    }
  },
}));
