import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Rocket,
  ShieldCheck,
  Users,
  Zap,
  GaugeCircle,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";

import TextInput from "../ui/TextInput";
import SelectBox from "../ui/SelectBox";
import { showToast } from "../ui/ShowToast";

import { registerUser } from "../../actions/AuthAction";

import Constants from "../../constants/Constants";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });
  const { currentUser } = useSelector((s) => s.auth);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email && !formData.phone) {
      setError("Either email or phone must be provided.");
      setLoading(false);
      return;
    }

    try {
      const userData = await dispatch(
        registerUser(
          formData.name,
          formData.email,
          formData.password,
          formData.role,
          formData.phone
        )
      );

      showToast("regsitered successfully", "success");

      // Switch based on role
      switch (userData?.user?.role) {
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

  const features = [
    {
      icon: Rocket,
      text: "Instant Onboarding – Get started in seconds.",
    },
    {
      icon: ShieldCheck,
      text: "Enterprise-Grade Security – Protect every interaction.",
    },
    {
      icon: Users,
      text: "Smart Role Management – Admin, Vendor, Delivery & You.",
    },
    {
      icon: Zap,
      text: "Real-Time Live Tracking – Stay updated every second.",
    },
    {
      icon: GaugeCircle,
      text: "Ultra-Fast Performance – Built for scale and speed.",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-8 bg-gray-100">
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
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-center gap-4"
                >
                  <feature.icon
                    size={26}
                    className="text-white drop-shadow-md"
                  />
                  <span className="text-lg leading-relaxed">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Register Form */}
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
                Create an Account
              </h1>
              <p className="text-gray-600">
                Start your quick commerce journey with us
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
                  label="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  //   placeholder=""
                  onChange={handleChange}
                  //   required
                  //   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <TextInput
                  type="email"
                  label="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  //   required
                  //   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your email"
                />
              </div>
              {/* <Divider>or</Divider> */}

              <div>
                <TextInput
                  type="password"
                  name="password"
                  label="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <TextInput
                  label="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  //   placeholder=""
                  onChange={handleChange}
                  //   required
                  // required={false}
                  //   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your  phone"
                />
              </div>

              <div>
                <SelectBox
                  label="Select Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  options={Object.values(Constants.USER_ROLE)}
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
                    Creating Account...
                  </div>
                ) : (
                  "Register"
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-green-600 hover:text-green-700"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
