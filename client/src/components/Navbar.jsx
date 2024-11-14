import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineUser, AiOutlineClose } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import logoImg from "../images/upTrendDark.png";
import { useUserStore } from "../stores/useUserStore";
import { BsDoorOpen } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { FaFileSignature } from "react-icons/fa";
function Navbar() {
  const { user, logout } = useUserStore();
  const isAdmin = user && user.role === "admin";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isMenuButton = event.target.closest(".menu-button");
      const isNavMenu = event.target.closest(".nav-menu");
      const isAccountButton = event.target.closest(".account-button");
      const isAccountMenu = event.target.closest(".account-menu");

      if (!isMenuButton && !isNavMenu && isMenuOpen) {
        setIsMenuOpen(false);
      }

      if (!isAccountButton && !isAccountMenu && isAccountOpen) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen, isAccountOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsAccountOpen(false);
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  const accountMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.nav
      className="bg-gray-800 fixed w-full top-0 z-50 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleNavigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img className="h-10 w-auto md:h-30" src={logoImg} alt="Logo" />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between flex-1 ml-10">
            <div className="flex space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="cursor-pointer"
                  onClick={() => handleNavigate(item.href)}
                >
                  <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {user && (
              <div className="flex items-center space-x-4">
                {/* Account Button and Dropdown */}
                <div className="relative">
                  <motion.button
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                    className="account-button flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AiOutlineUser className="text-xl" />
                    <span>{user?.name}</span>
                  </motion.button>

                  <AnimatePresence>
                    {isAccountOpen && !isMobile && (
                      <motion.div
                        className="account-menu absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5"
                        variants={accountMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <div className="py-1">
                          <motion.div
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                            onClick={() => handleNavigate("/profile")}
                          >
                            My Profile
                          </motion.div>
                          <motion.div
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                            onClick={() => handleNavigate("/settings")}
                          >
                            Settings
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Cart Button */}
                <motion.button
                  onClick={() => handleNavigate("/cart")}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BsCart2 className="text-xl" />
                  <span>Cart</span>
                </motion.button>

                {/* Dashboard Button */}
                {isAdmin && (
                  <motion.button
                    onClick={() => handleNavigate("/dashboard")}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MdDashboard className="text-xl" />
                    <span>Dashboard</span>
                  </motion.button>
                )}
                {user && (
                  <motion.button
                    onClick={logout}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BsDoorOpen className="text-xl" />
                    <span>Log out</span>
                  </motion.button>
                )}
              </div>
            )}

            {!user && (
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={() => handleNavigate("/login")}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CiLogin className="text-xl" />

                  <span>Login</span>
                </motion.button>
                <motion.button
                  onClick={() => handleNavigate("/sign-up")}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaFileSignature className="text-xl" />
                  <span>Sign up</span>
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile Right Section */}
          <div className="flex items-center lg:hidden">
            {/* Mobile Account Button */}
            {user && (
              <div className="relative">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAccountOpen(!isAccountOpen);
                  }}
                  className="account-button mr-2 p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AiOutlineUser className="h-6 w-6" />
                </motion.button>

                <AnimatePresence>
                  {isAccountOpen && isMobile && (
                    <motion.div
                      className="account-menu absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5"
                      variants={accountMenuVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <div className="py-1">
                        <motion.div
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                          onClick={() => handleNavigate("/profile")}
                        >
                          My Profile
                        </motion.div>
                        <motion.div
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                          onClick={() => handleNavigate("/settings")}
                        >
                          Settings
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            {/* Mobile Cart Button */}
            {user && (
              <motion.button
                onClick={() => handleNavigate("/cart")}
                className="mr-2 p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BsCart2 className="h-6 w-6" />
              </motion.button>
            )}

            {!user && (
              <div className="flex items-center space-x-2 mr-2 text-sm">
                <motion.button
                  onClick={() => handleNavigate("/login")}
                  className="mr-2 p-2 rounded-md text-gray-300 bg-green-600 hover:bg-green-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
                <motion.button
                  onClick={() => handleNavigate("/login")}
                  className="mr-2 p-2 rounded-md text-gray-300 bg-green-600 hover:bg-green-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign up
                </motion.button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              className="menu-button p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <AiOutlineClose className="h-6 w-6" />
              ) : (
                <HiMenuAlt3 className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden nav-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 ">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    variants={menuItemVariants}
                    transition={{ delay: index * 0.1 }}
                    className="cursor-pointer"
                    onClick={() => handleNavigate(item.href)}
                  >
                    <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
                <div className="space-y-4 px-2 pb-1">
                  {isAdmin && (
                    <motion.button
                      variants={menuItemVariants}
                      transition={{ delay: (navItems.length + 1) * 0.1 }}
                      className="cursor-pointer"
                      onClick={() => handleNavigate("/dashboard")}
                    >
                      <span className=" px-3 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700">
                        Dashboard
                      </span>
                    </motion.button>
                  )}

                  {user && (
                    <motion.button
                      variants={menuItemVariants}
                      transition={{ delay: (navItems.length + 1) * 0.1 }}
                      onClick={logout}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    >
                      <BsDoorOpen className="text-xl" />
                      <span>Log out</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;
