import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  CheckCircle,
  ArrowRight,
  Fingerprint,
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

// Import components and actions
// TextInput is imported below as a new component
import { showToast } from "../ui/ShowToast";
import { loginUser } from "../../actions/AuthAction";

// Enhanced TextInput Component
const TextInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const actualType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={name}
          className={`absolute left-3 transition-all duration-200 ${
            isFocused || value
              ? "-top-2.5 text-xs font-bold text-green-600 bg-white px-1"
              : "top-3.5 text-gray-500"
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-${isFocused ? "green-600" : "gray-400"}`}
          >
            <Icon size={18} />
          </div>
        )}

        <input
          id={name}
          name={name}
          type={actualType}
          value={value}
          onChange={onChange}
          placeholder={isFocused ? placeholder : ""}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full py-3.5 px-4 ${Icon ? "pl-10" : ""} border ${
            isFocused
              ? "border-green-600 ring-2 ring-green-100"
              : error
                ? "border-red-300 bg-red-50"
                : "border-gray-300"
          } rounded-lg focus:outline-none transition-all duration-200`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-600 flex items-center">
          <AlertCircle size={12} className="mr-1" /> {error}
        </p>
      )}
    </div>
  );
};

// Animated Feature Item
const FeatureItem = ({ icon: Icon, text, index }) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 + 0.3 }}
      className="flex items-center gap-3 p-3 pl-2 transition-all rounded-lg hover:bg-white/10"
    >
      <div className="p-2 rounded-full bg-white/20">
        <Icon size={18} className="text-white" />
      </div>
      <span className="text-base font-medium">{text}</span>
    </motion.div>
  );
};

// Custom wavy divider
const WavyDivider = () => (
  <div className="absolute left-0 h-full overflow-hidden pointer-events-none -z-10">
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,0 C30,20 70,0 100,30 L100,100 L0,100 Z"
        fill="url(#gradient)"
        opacity="0.1"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Animated background polygon
const AnimatedPolygon = ({ delay }) => (
  <motion.div
    initial={{ scale: 0, rotate: 0, opacity: 0 }}
    animate={{
      scale: 1,
      rotate: 45,
      opacity: 0.05,
      transition: { duration: 0.8, delay },
    }}
    className="absolute bg-white rounded-lg"
    style={{
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 80 + 10}%`,
    }}
  />
);

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);

  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setAnimateForm(true), 200);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear field errors when user types
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is not valid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Fixed: Using await properly with dispatch
      await dispatch(loginUser(formData.email, formData.password));

      // Use currentUser from updated state after login
      const userRole = currentUser?.role || "customer";

      showToast("Login successful", "success");

      // Redirect based on role
      switch (userRole) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "shopkeeper":
          navigate("/shopkeeper/dashboard");
          break;
        case "deliveryboy":
          navigate("/delivery/dashboard");
          break;
        default:
          navigate("/products");
      }
    } catch (error) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-50">
      {/* Custom background elements */}
      <WavyDivider />
      {[...Array(5)].map((_, i) => (
        <AnimatedPolygon key={i} delay={i * 0.15} />
      ))}

      <div className="w-full px-4 py-8 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-6xl mx-auto overflow-hidden bg-white shadow-2xl rounded-3xl"
        >
          <div className="flex flex-col md:flex-row">
            {/* Feature Panel - Hidden on smaller screens but with a nice touch */}
            <div className="relative w-full px-8 py-8 overflow-hidden md:w-5/12 bg-gradient-to-br from-green-600 via-green-500 to-amber-500">
              {/* Only show this on small screens */}
              <motion.div
                className="flex items-center justify-between md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  whileHover={{ rotate: -15 }}
                  className="inline-block p-2 bg-white rounded-xl"
                >
                  <ShoppingBag size={30} className="text-green-600" />
                </motion.div>
                <span className="text-2xl font-bold text-white">ShopMart</span>
              </motion.div>

              {/* Feature content - hidden on mobile */}
              <div className="flex-col justify-between hidden h-full md:flex">
                <div className="mb-8">
                  <motion.div
                    whileHover={{ rotate: -15 }}
                    className="inline-block p-3 mb-4 bg-white rounded-xl"
                  >
                    <ShoppingBag size={36} className="text-green-600" />
                  </motion.div>
                  <h1 className="mb-2 text-3xl font-bold text-white">
                    ShopMart
                  </h1>
                  <p className="text-green-50">
                    Your ultimate grocery experience
                  </p>
                </div>

                <div className="space-y-1">
                  <FeatureItem
                    icon={CheckCircle}
                    text="10-Minute Grocery Delivery"
                    index={0}
                  />
                  <FeatureItem
                    icon={CheckCircle}
                    text="24/7 Availability"
                    index={1}
                  />
                  <FeatureItem
                    icon={CheckCircle}
                    text="Live Order Tracking"
                    index={2}
                  />
                  <FeatureItem
                    icon={CheckCircle}
                    text="Premium Quality Assurance"
                    index={3}
                  />
                  <FeatureItem
                    icon={CheckCircle}
                    text="Smart Inventory Management"
                    index={4}
                  />
                </div>

                <div className="pt-8">
                  <p className="text-sm text-green-50">
                    © 2025 ShopMart. All rights reserved.
                  </p>
                </div>
              </div>

              {/* Mobile features (simplified) */}
              <div className="mt-6 md:hidden">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Fast Delivery",
                    "24/7 Service",
                    "Live Tracking",
                    "Premium Quality",
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-2 text-xs font-medium text-center text-green-700 bg-white rounded-full"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Login Form */}
            <div className="relative flex items-center justify-center w-full px-8 py-8 md:w-7/12 md:px-12 md:py-12">
              <motion.div
                variants={formAnimation}
                initial="hidden"
                animate={animateForm ? "visible" : "hidden"}
                className="w-full max-w-md"
              >
                <motion.div variants={itemAnimation} className="mb-8">
                  <h1 className="mb-2 text-3xl font-extrabold text-gray-800">
                    Welcome Back!
                  </h1>
                  <p className="text-gray-600">
                    Sign in to continue your quick commerce experience
                  </p>
                </motion.div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 mb-6 text-red-600 border border-red-300 rounded-lg bg-red-50"
                  >
                    <div className="flex items-start">
                      <AlertCircle size={20} className="mr-2 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <motion.div variants={itemAnimation}>
                    <TextInput
                      label="Email Address"
                      name="email"
                      type="email"
                      icon={Mail}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      error={formErrors.email}
                    />
                  </motion.div>

                  <motion.div variants={itemAnimation}>
                    <TextInput
                      type="password"
                      label="Password"
                      name="password"
                      icon={Lock}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      error={formErrors.password}
                    />
                  </motion.div>

                  <motion.div
                    variants={itemAnimation}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label
                        htmlFor="remember-me"
                        className="block ml-2 text-sm text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-green-600 hover:text-green-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </motion.div>

                  <motion.div variants={itemAnimation}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="relative w-full overflow-hidden text-white rounded-lg group bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-amber-500"
                    >
                      <span className="absolute top-0 left-0 w-full h-full transition-all duration-300 opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full"></span>
                      <div className="px-6 py-3.5 flex items-center justify-center">
                        {loading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                            <span>Signing in...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <span className="mr-2 font-medium">Sign In</span>
                            <ArrowRight size={18} />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  </motion.div>
                </form>

                <motion.div
                  variants={itemAnimation}
                  className="mt-6 text-sm text-center text-gray-600"
                >
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold transition-colors text-green-600 hover:text-green-700"
                  >
                    Create account
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
