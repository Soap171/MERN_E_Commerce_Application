import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  product: null,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/products", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully");
    } catch (error) {
      set({ loading: false });
      console.log(error);
      toast.error("Server Error. Please try again later");
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/products");
      set({ products: res.data.products, loading: false });
    } catch (error) {
      set({ loading: false });
      console.log(error);
      toast.error("Server Error. Please try again later");
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/products/${id}`);
      set((prevState) => ({
        products: prevState.products.filter((product) => product._id !== id),
        loading: false,
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Server Error. Please try again later");
    }
  },

  toggleFeaturedProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.patch(`/products/${id}`);
      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id === id
            ? { ...product, isFeatured: !product.isFeatured }
            : product
        ),
        loading: false,
      }));
      console.log(res);
      toast.success("Product featured status updated successfully");
    } catch (error) {
      console.log(error.response);
      toast.error("Server Error. Please try again later");
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true });
    try {
      console.log(id, "id");
      const res = await axiosInstance.get(`/products/${id}`);
      set({ product: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },

  updateProduct: async (id, updatedProduct) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.put(`/products/${id}`, updatedProduct);
      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id === id ? res.data.product : product
        ),
        loading: false,
      }));
      toast.success("Product updated successfully");
    } catch (error) {
      set({ loading: false });
      console.log(error);
      toast.error("Server Error. Please try again later");
    }
  },
}));
