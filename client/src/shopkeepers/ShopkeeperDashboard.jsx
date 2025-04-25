import React from "react";
import { PackageCheck, Truck, ClipboardList, Store } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Total Orders",
    value: 120,
    icon: <ClipboardList size={28} className="text-green-600" />,
  },
  {
    title: "Delivered",
    value: 95,
    icon: <Truck size={28} className="text-amber-500" />,
  },
  {
    title: "Pending",
    value: 25,
    icon: <PackageCheck size={28} className="text-red-500" />,
  },
];

const ShopkeeperDashboard = () => {
  return (
    <div className="min-h-screen px-6 py-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">
          Shopkeeper Dashboard
        </h1>
        <p className="text-gray-500">Manage your store orders and deliveries</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="flex items-center justify-between p-6 bg-white border shadow rounded-2xl hover:shadow-md"
          >
            <div>
              <h4 className="text-lg font-semibold text-gray-700">
                {stat.title}
              </h4>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
            <div>{stat.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Future Tables/Features Here */}
      <div className="mt-10">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">
          Orders Overview
        </h2>
        {/* Placeholder for table or order list component */}
        <div className="p-6 text-gray-500 bg-white border border-gray-200 rounded-lg">
          Order management table coming soon...
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;
