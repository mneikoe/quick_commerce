const express = require("express");
const router = express.Router();
const {
  placeOrder,
  updateOrderStatus,
  getOrderDetails,
  getMyOrders,
} = require("../controllers/orderController");

const verifyToken = require("../middlewares/authMiddleware");

// Apply auth middleware to all routes below
router.use(verifyToken);

// Place new order
router.post("/", placeOrder);

// Get user's own orders
router.get("/my", getMyOrders);

// Update status of an order
router.put("/:orderId/status", updateOrderStatus);

// (Optional) Get single order details
router.get("/:orderId", getOrderDetails);

module.exports = router;
