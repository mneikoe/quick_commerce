import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Lock } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-8 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full overflow-hidden bg-white border border-gray-300 shadow-lg max-w-7xl rounded-2xl"
      >
        <div className="flex flex-col md:flex-row">
          {/* Feature Panel */}
          <div className="flex flex-col justify-center w-full p-8 space-y-6 text-white max-md:hidden md:w-1/2 bg-gradient-to-br from-red-600 to-amber-500 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <Lock size={20} className="text-white" />
                  <span className="text-lg">Access Denied</span>
                </motion.div>
                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <Lock size={20} className="text-white" />
                  <span className="text-lg">
                    You do not have permission to view this page.
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Unauthorized Message */}
          <div className="flex flex-col justify-center w-full p-8 md:w-1/2 md:p-12">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="mb-8 text-center"
            >
              <div className="mb-4">
                <motion.div
                  whileHover={{ rotate: -10 }}
                  className="inline-block p-3 bg-red-600 shadow-lg rounded-xl"
                >
                  <ShoppingBag size={40} className="text-white" />
                </motion.div>
              </div>
              <h1 className="mb-2 text-3xl font-extrabold text-gray-800">
                Unauthorized Access
              </h1>
              <p className="text-gray-600">
                You are not authorized to view this page.
              </p>
            </motion.div>

            <div className="mt-6 text-sm text-center text-gray-600">
              Go back to the{" "}
              <Link
                to="/"
                className="font-semibold text-green-600 hover:text-green-700"
              >
                Home Page
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
