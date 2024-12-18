import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [otp, setOtp] = useState(Array(6).fill("")); // Array with 6 empty strings
  const inputRefs = useRef([]); // Array of refs for each input field
  const { verifyEmail, loading } = useUserStore();
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const index = inputRefs.current.indexOf(e.target);
      if (index > 0) {
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index - 1),
          "",
          ...prevOtp.slice(index),
        ]);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleInput = (e) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    if (target.value) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!/^\d{6}$/.test(text)) return; // Ensure only 6-digit input is allowed

    const digits = text.split("");
    setOtp(digits);
    inputRefs.current[5]?.focus(); // Focus on the last input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.includes("")) {
      toast.error("Please enter the verification code");
      return;
    }
    verifyEmail(otp.join(""), navigate);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
      >
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl bg-white shadow-lg">
          <div className="text-center mb-2">
            <h1 className="text-gray-800 font-semibold m-5 h-1 text-2xl">
              Verify Your Email To Continue
            </h1>
          </div>
          <form id="otp-form" onSubmit={handleSubmit} className="p-8">
            <div className="space-y-2">
              <div className="relative flex justify-center space-x-2 p-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onPaste={handlePaste}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="shadow-xs w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-center text-2xl font-medium text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
              <div className="text-center mt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-gradient-to-r from-slate-900 to-slate-700 focus:outline-none"
                >
                  {loading ? "Verifying..." : "Verify"}
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default VerifyEmail;
