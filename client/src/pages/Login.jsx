import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import GoogleAuth from "../components/GoogleAuth";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { login, loading } = useUserStore();

  const [validation, setValidation] = useState({
    email: null,
    password: null,
  });

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

      case "password":
        setValidation({ ...validation, password: value.length >= 6 });
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    if (formData.email === "" || formData.password === "") {
      toast.error("Please fill all the fields to login");
      return;
    }

    if (validation.email === false) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (validation.password === false) {
      toast.error("Password should be atleast 6 characters long");
      return;
    }

    login(formData.email, formData.password, navigate);
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
      >
        <div className="max-w-md w-full mx-auto border  border-gray-300 rounded-2xl p-8 bg-white shadow-lg">
          <div className="text-center mb-12">
            <h1 className="text-gray-800  font-semibold text-2xl">
              Login To Your Account
            </h1>
          </div>
          <form>
            <div className="space-y-2">
              <div className="relative">
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
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
                    className={`absolute right-3 top-10 transform -translate-y-1/2`}
                  >
                    {validation.email ? "✅" : "❌"}
                  </span>
                )}
              </div>
              <div className="relative">
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className={`text-gray-800 bg-white border ${
                    validation.password === null
                      ? "border-gray-300"
                      : validation.password
                      ? "border-green-500"
                      : "border-red-500"
                  } w-full text-sm px-4 py-3 rounded-sm outline-blue-500`}
                  placeholder="Enter password"
                  onChange={handleInputChange}
                />
                {validation.password !== null && (
                  <span
                    className={`absolute right-3 top-10 transform -translate-y-1/2`}
                  >
                    {validation.password ? "✅" : "❌"}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-12 ">
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-gradient-to-r from-slate-900 to-slate-700  focus:outline-none"
                onClick={handleSubmit}
              >
                {loading ? "Logging..." : "Login"}
              </motion.button>
            </div>
            <div className="mt-2">
              <GoogleAuth />
            </div>
            <div className="text-center flex items-center justify-between">
              <div class="flex items-center justify-between ">
                <div class="flex h-5  my-4">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                    required=""
                  />
                </div>
                <div class="ml-2 text-sm">
                  <label for="remember" class="text-gray-00">
                    Remember me
                  </label>
                </div>
              </div>
              <Link
                to="/forget-password"
                className="text-red-400 text-sm  hover:underline   "
              >
                Forget Password ? {""}
              </Link>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">
              Not a member ? {""}
              <Link
                to="/sign-up"
                className="text-gray-600 font-semibold hover:underline ml-1"
              >
                Register Now
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
Login;
