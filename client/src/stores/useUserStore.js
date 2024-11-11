import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async (name, email, password, navigate) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });
      set({ user: res.data, loading: false });
      console.log(res.data);
      toast.success("Signup successful Please verify your email");
      setTimeout(() => {
        navigate("/verify-email");
      }, 2000);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message);
      console.log(error.response);
    }
  },

  verifyEmail: async (code, navigate) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/verify-email", { code });
      set({ user: res.data, loading: false });
      console.log(res.data);
      toast.success("Email verified successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message);
      console.log(error.response);
    }
  },

  forgetPassword: async (email) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      set({ loading: false });
      console.log(res.data.message);
      toast.success(res.data.message);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message);
      console.log(error.response);
    }
  },

  resetNewPassword: async (password, token, navigate) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post(`/auth/reset-password/${token}`, {
        password,
      });
      set({ loading: false });
      console.log(res.data.message);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      set({ loading: false });
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  },

  login: async (email, password, navigate) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      set({ user: res.data, loading: false });
      console.log(res.data);
      toast.success("Login successful");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      set({ loading: false });
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  },
}));
