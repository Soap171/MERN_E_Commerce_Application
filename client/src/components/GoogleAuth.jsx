import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

function GoogleAuth() {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-gradient-to-r from-slate-900 to-slate-700 focus:outline-none flex items-center justify-center space-x-2"
    >
      <FcGoogle size={24} />
      <span>Sign in with Google</span>
    </motion.button>
  );
}

export default GoogleAuth;
