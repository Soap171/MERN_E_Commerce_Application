import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { app } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
function GoogleAuth() {
  const navigate = useNavigate();
  const { googleAuth, loading } = useUserStore();
  const auth = getAuth(app);
  const handleSubmit = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultFromGoogle);
      await googleAuth(
        resultFromGoogle.user.email,
        resultFromGoogle.user.displayName,
        resultFromGoogle.user.photoURL,
        navigate
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleSubmit}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-gradient-to-r from-slate-900 to-slate-700 focus:outline-none flex items-center justify-center space-x-2"
    >
      <FcGoogle size={24} />
      <span>{loading ? "Signing With Google..." : "Sign With Google"}</span>
    </motion.button>
  );
}

export default GoogleAuth;
