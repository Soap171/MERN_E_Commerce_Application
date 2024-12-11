import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminDashboard from "./pages/AdminDashboard";
import ProductForm from "./pages/ProductForm";
import ProductsView from "./pages/ProductsView";
import Analytics from "./pages/Analytics";
function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <LoadingSpinner />;
  }
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 min-h-screen flex flex-col ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={!user ? <SignUp /> : <Home />} />
          <Route path="/login" element={!user ? <Login /> : <Home />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/dashboard"
            element={user?.role === "admin" ? <AdminDashboard /> : <Home />}
          />

          <Route
            path="/dashboard/product/:id?"
            element={user?.role === "admin" ? <ProductForm /> : <Home />}
          />

          <Route
            path="/dashboard/products"
            element={user?.role === "admin" ? <ProductsView /> : <Home />}
          />

          <Route
            path="/dashboard/analytics"
            element={user?.role === "admin" ? <Analytics /> : <Home />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
