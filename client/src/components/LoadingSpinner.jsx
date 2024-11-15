import React from "react";
import { FiLoader } from "react-icons/fi";

function LoadingSpinner() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 min-h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <div role="status" className="text-white">
          <FiLoader className="inline  h-12 w-12 animate-spin text-emerald-500" />
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
