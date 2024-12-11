import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaPlus,
  FaList,
  FaChartBar,
} from "react-icons/fa";
import { BsDoorOpen } from "react-icons/bs"; // Correct import for BsDoorOpen
import { useUserStore } from "../stores/useUserStore";
import { motion } from "framer-motion";

function SideNav() {
  const [isOpen, setIsOpen] = useState(true); // Set initial state to true
  const { user, logout } = useUserStore();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: 0 }} // Ensure the sidebar is open by default
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-4 bg-gray-900">
          <h1 className="text-xl font-bold">Hello, {user?.name}</h1>
          <button className="text-white lg:hidden" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        <nav className="mt-4 p-5">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/dashboard"
              className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              <FaHome className="inline-block mr-2" />
              Dashboard
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/dashboard/product"
              className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              <FaPlus className="inline-block mr-2" />
              Add Product
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/dashboard/products"
              className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              <FaList className="inline-block mr-2" />
              Products List
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/dashboard/analytics"
              className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              <FaChartBar className="inline-block mr-2" />
              Analytics
            </Link>
          </motion.div>
        </nav>

        <div className="mt-5 p-5">
          <motion.button
            onClick={logout}
            className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 mt-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BsDoorOpen className="text-xl" />
            <span>Log out</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center justify-between p-4 bg-gray-900 text-white lg:hidden">
          <button className="text-white" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </header>
        <main className="flex-1 p-4">{/* Your main content goes here */}</main>
      </div>
    </div>
  );
}

export default SideNav;
