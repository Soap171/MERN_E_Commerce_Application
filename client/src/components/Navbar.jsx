import React, { useState } from "react";
import logoImg from "../images/logo.png";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleAccountMenu = () => {
    setIsAccountOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-screen-xl px-4 mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <a href="#" title="Home" className="shrink-0">
            <img className="w-auto h-8" src={logoImg} alt="Logo Dark" />
          </a>
          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-6">
            <NavItem label="Home" href="/" />
            <NavItem label="Best Sellers" href="#" />
            <NavItem label="Gift Ideas" href="#" />
            <NavItem label="Today's Deals" href="#" />
            <NavItem label="Sell" href="#" />
          </ul>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-gray-800 shadow-lg">
            <ul className="flex flex-col items-start p-4 space-y-2">
              <NavItem label="Home" href="#" />
              <NavItem label="Best Sellers" href="#" />
              <NavItem label="Gift Ideas" href="#" />
              <NavItem label="Today's Deals" href="#" />
              <NavItem label="Sell" href="#" />
            </ul>
          </div>
        )}

        {/* Account and Cart Section */}
        <div className="flex lg:flex items-center space-x-4">
          {/* Account Icon */}
          <div className="relative">
            <Link
              to="#"
              onClick={toggleAccountMenu}
              className="flex items-center space-x-2 p-2 text-white hover:bg-gray-700 rounded-lg"
            >
              <AiOutlineUser className="w-6 h-6" />
              <span>Account</span>
            </Link>
            {isAccountOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg">
                <ul className="py-2">
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                    >
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                    >
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Cart Button */}
          <button
            type="button"
            className="flex items-center space-x-2 p-2 text-white hover:bg-gray-700 rounded-lg"
          >
            <BsCart2 className="w-6 h-6" />
            <span>My Cart</span>
          </button>

          <Link
            className="flex items-center space-x-2 p-2 text-white hover:bg-green-700 rounded-lg bg-green-600"
            to="/dashboard"
          >
            <MdDashboard className="w-6 h-6" />
            <span>Dashboard</span>
          </Link>

          {/* Hamburger Icon */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-primary-500 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ label, href }) {
  return (
    <li>
      <Link
        to={href}
        className="text-sm font-medium text-white hover:text-primary-500"
      >
        {label}
      </Link>
    </li>
  );
}

export default Navbar;
