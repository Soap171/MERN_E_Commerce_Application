import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useParams } from "react-router-dom";
import { set } from "mongoose";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState({});
  const navigate = useNavigate();
  const { token } = useParams();
  const { resetNewPassword, loading } = useUserStore();
  const [confirmPassword, setConfirmPassword] = useState({});
  const [validation, setValidation] = useState({
    nPassword: null,
    cPassword: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPassword({ ...newPassword, [name]: value });
    setConfirmPassword({ ...confirmPassword, [name]: value });

    switch (name) {
      case "nPassword":
        setValidation({ ...validation, nPassword: value.length >= 6 });
        break;

      case "cPassword":
        setValidation({
          ...validation,
          cPassword: value === newPassword.nPassword,
        });
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation.nPassword || !validation.cPassword) {
      toast.error("Please fill all the fields");
      return;
    }

    if (newPassword.nPassword !== confirmPassword.cPassword) {
      toast.error("Passwords do not match");
      return;
    }

    resetNewPassword(newPassword.nPassword, token, navigate);
    setNewPassword({});
    setConfirmPassword({});
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
      >
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8 bg-white shadow-lg">
          <div className="text-center mb-12">
            <h1 className="text-2xl text-gray-800 ">Type Your New Password</h1>
          </div>
          <form>
            <div className="space-y-2">
              <div className="relative">
                <label className="text-gray-800 text-sm mb-2 block">
                  New Password
                </label>
                <input
                  type="password"
                  name="nPassword"
                  onChange={handleInputChange}
                  className={`tex-gay-800 bg-white border  ${
                    validation.nPassword === null
                      ? "border-gray-300"
                      : validation.nPassword
                      ? "border-green-500"
                      : "border-red-500"
                  } w-full text-sm px-4 py-2 rounded-md outline-blue-500`}
                />
                {validation.nPassword !== null && (
                  <span
                    className={`absolute right-3 top-10 transform -translate-y-1/2`}
                  >
                    {validation.nPassword ? "✅" : "❌"}
                  </span>
                )}
              </div>
              <div className="relative">
                <label className="text-gray-800 text-sm mb-2 block">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="cPassword"
                  onChange={handleInputChange}
                  className={`text-gray-800 text-sm bg-white border ${
                    validation.cPassword === null
                      ? "border-gray-300"
                      : validation.cPassword
                      ? "border-green-500"
                      : "border-red-500"
                  } w-full px-4 py-2 rounded-md outline-blue-500`}
                />
                {validation.cPassword !== null && (
                  <span className="absolute right-3 top-10 transform -translate-y-1/2">
                    {validation.cPassword ? "✅" : "❌"}
                  </span>
                )}
              </div>
            </div>
          </form>
          <div className="mt-5">
            <motion.button
              className="w-full py-3 text-sm tracking-wider font-semibold rounded-md text-white bg-gradient-to-r from-slate-900 to-slate-700 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSubmit}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ResetPassword;
