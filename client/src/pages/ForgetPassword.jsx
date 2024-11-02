import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const [validation, setValidation] = useState({
    email: null,
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
    setValidation({ ...validation, email: validateEmail(value) });

    switch (name) {
      case "email":
        setValidation({ ...validation, email: validateEmail(value) });
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    if (email === "") {
      toast.error("Please fill all the fields to login");
      return;
    }

    if (validation.email === false) {
      toast.error("Please enter a valid email");
      return;
    }

    toast.success("Email sent successfully");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-5 ">
      <motion.div
        className="w-full "
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
      >
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-6 bg-white shadow-lg ">
          <div className="text-center">
            <h1 className="text-2xl text-gray-800 font-semibold">
              Reset Your Password
            </h1>
          </div>
          <form>
            <div className="space-y-2">
              <div className="relative">
                <label className="text-gray-800 block text-sm mb-2">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  className={`w-full  text-gray-800 bg-white border  ${
                    validation.email === null
                      ? "border-gray-300"
                      : validation.email
                      ? "border-green-500"
                      : "border-red-500"
                  } text-sm  px-4 py-2  rounded-sm outline-blue-500`}
                  placeholder="Enter your account email"
                  onChange={handleInputChange}
                />
                {validation.email !== null && (
                  <span
                    className={`absolute right-3 top-10 transform -translate-y-1/2`}
                  >
                    {validation.email ? "✅" : "❌"}
                  </span>
                )}
              </div>
            </div>
          </form>
          <div className="text-center mt-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-gradient-to-r from-slate-900 to-slate-700  focus:outline-none"
              onClick={handleSubmit}
            >
              Send Password Reset Email
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgetPassword;
