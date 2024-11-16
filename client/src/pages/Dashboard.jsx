import { useState, useEffect } from "react";
import { IoIosCreate } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import { IoMdAnalytics } from "react-icons/io";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import AnalyticsTab from "../components/AnalyticsTab";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate, Route, Routes } from "react-router-dom";

function Dashboard() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const tabs = [
    {
      id: "create",
      label: "Create Product",
      icon: IoIosCreate,
      path: "/dashboard/create",
    },
    {
      id: "products",
      label: "Products",
      icon: AiFillProduct,
      path: "/dashboard/products",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: IoMdAnalytics,
      path: "/dashboard/analytics",
    },
  ];

  const [activeTab, setActiveTab] = useState("products");

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-white text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome {user?.name}
        </motion.h1>

        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <Routes>
          <Route path="create" element={<CreateProductForm />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="analytics" element={<AnalyticsTab />} />
          <Route path="edit/:id" element={<CreateProductForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
