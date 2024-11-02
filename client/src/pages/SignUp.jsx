import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function SignUp() {
  const [agree, setAgree] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    cpassword: "",
  });
  const [validation, setValidation] = useState({
    email: null,
    name: null,
    password: null,
    cpassword: null,
  });

  const handleAgree = () => {
    setAgree(!agree);
  };

  const handleSubmit = (e) => {
    if (agree === false) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    if (
      formData.email === "" ||
      formData.name === "" ||
      formData.password === "" ||
      formData.cpassword === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (formData.password !== formData.cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    console.log(formData);
    toast.success("Account created successfully");
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case "email":
        setValidation({ ...validation, email: validateEmail(value) });
        break;
      case "name":
        setValidation({ ...validation, name: value.length > 0 });
        break;
      case "password":
        setValidation({ ...validation, password: value.length >= 6 });
        break;
      case "cpassword":
        setValidation({
          ...validation,
          cpassword: value === formData.password,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 ">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
      >
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8 bg-white shadow-lg">
          <div className="text-center mb-12">
            <a href="javascript:void(0)">
              <img
                src="https://readymadeui.com/readymadeui.svg"
                alt="logo"
                className="w-40 inline-block"
              />
            </a>
          </div>

          <form>
            <div className="space-y-2">
              <div className="relative">
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <input
                  name="email"
                  type="text"
                  className={`text-gray-800 bg-white border ${
                    validation.email === null
                      ? "border-gray-300"
                      : validation.email
                      ? "border-green-500"
                      : "border-red-500"
                  } w-full text-sm px-4 py-3 rounded-md outline-blue-500`}
                  placeholder="Enter email"
                  onChange={handleInputChange}
                />
                {validation.email !== null && (
                  <span
                    className={`absolute right-3 top-10 transform -translate-y-1/2 `}
                  >
                    {validation.email ? "✅" : "❌"}
                  </span>
                )}
              </div>
              <div className="relative">
                <label className="text-gray-800 text-sm mb-2 block">
                  Username
                </label>
                <input
                  name="name"
                  type="text"
                  className={`text-gray-800 bg-white border ${
                    validation.name === null
                      ? "border-gray-300"
                      : validation.name
                      ? "border-green-500"
                      : "border-red-500"
                  } w-full text-sm px-4 py-3 rounded-md outline-blue-500`}
                  placeholder="Enter Username"
                  onChange={handleInputChange}
                />
                {validation.name !== null && (
                  <span
                    className={`absolute right-3 top-10 transform -translate-y-1/2 `}
                  >
                    {validation.name ? "✅" : "❌"}
                  </span>
                )}
              </div>
              <div className="relative">
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className={`text-gray-800 bg-white border ${
                    validation.password === null
                      ? "border-gray-300"
                      : validation.password
                      ? "border-green-500"
                      : "border-red-500"
                  } w-full text-sm px-4 py-3 rounded-md outline-blue-500`}
                  placeholder="Enter password"
                  onChange={handleInputChange}
                />
                {validation.password !== null && (
                  <span
                    className={`absolute right-3 top-10 transform -translate-y-1/2 `}
                  >
                    {validation.password ? "✅" : "❌"}
                  </span>
                )}
              </div>
              <div className="relative">
                <label className="text-gray-800 text-sm mb-2 block">
                  Confirm Password
                </label>
                <input
                  name="cpassword"
                  type="password"
                  className={`text-gray-800 bg-white border ${
                    validation.cpassword === null
                      ? "border-gray-300"
                      : validation.cpassword
                      ? "border-green-500"
                      : "border-red-500"
                  } w-full text-sm px-4 py-3 rounded-md outline-blue-500`}
                  placeholder="Enter confirm password"
                  onChange={handleInputChange}
                />
                {validation.cpassword !== null && (
                  <span
                    className={`absolute right-3 top-10 transform -translate-y-1/2 `}
                  >
                    {validation.cpassword ? "✅" : "❌"}
                  </span>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  onClick={handleAgree}
                />
                <label
                  htmlFor="remember-me"
                  className="text-gray-800 ml-3 block text-sm"
                >
                  I accept the{" "}
                  <Link
                    to="/terms-and-conditions"
                    className=" font-semibold hover:underline ml-1"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div>

            <div className="mt-12">
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-gradient-to-r from-slate-900 to-slate-700 focus:outline-none"
                onClick={handleSubmit}
              >
                Create an account
              </motion.button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-gray-800 font-semibold hover:underline ml-1"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default SignUp;
