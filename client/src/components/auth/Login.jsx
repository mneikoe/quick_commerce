import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

import { AuthContext } from "../../context/AuthContext";

import TextInput from "../ui/TextInput";
import { showToast } from "../ui/ShowToast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userData = await login(formData.email, formData.password);
      console.log(userData);
      showToast("login successfully", "success");
      switch (userData.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "shopkeeper":
          navigate("/shopkeeper/dashboard");
          break;
        case "deliveryBoy":
          navigate("/delivery/dashboard");
          break;

        default:
          navigate("/products");
        // navigate("/");
      }
    } catch (error) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-8 bg-gray-100 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full overflow-hidden bg-white border border-gray-300 shadow-lg max-w-7xl rounded-2xl"
      >
        <div className="flex flex-col md:flex-row">
          {/* Feature Panel */}
          <div className="flex flex-col justify-center w-full p-8 space-y-6 text-white max-md:hidden md:w-1/2 bg-gradient-to-br from-green-600 to-amber-500 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="space-y-4">
                {[
                  "10-Minute Grocery Delivery",
                  "24/7 Availability",
                  "Live Order Tracking",
                  "Premium Quality Assurance",
                  "Smart Inventory Management",
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle size={20} className="text-white" />
                    <span className="text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Login Form */}
          <div className="flex flex-col justify-center w-full p-8 md:w-1/2 md:p-12">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="mb-8 text-center"
            >
              <div className="mb-4">
                <motion.div
                  whileHover={{ rotate: -10 }}
                  className="inline-block p-3 bg-green-600 shadow-lg rounded-xl"
                >
                  <ShoppingBag size={40} className="text-white" />
                </motion.div>
              </div>
              <h1 className="mb-2 text-4xl font-extrabold text-gray-800">
                Welcome Back!
              </h1>
              <p className="text-gray-600">
                Continue your quick commerce experience
              </p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 mb-6 text-red-600 border border-red-300 rounded-lg bg-red-50"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <TextInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <TextInput
                  type="password"
                  label="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-amber-500 text-white py-3.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  "Sign In"
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-green-600 hover:text-green-700"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
