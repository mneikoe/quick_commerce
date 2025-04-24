import express from "express";
import {
  placeOrder,
  updateOrderStatus,
  getOrderDetails,
  getMyOrders,
} from "../controllers/orderController.js";

// import { verifyToken } from "../middlewares/authMiddleware.js";

const orderRoutes = express.Router();

// Apply auth middleware to all routes below
// orderRoutes.use(verifyToken);

// Place new order
orderRoutes.post("/", placeOrder);

// Get user's own orders
orderRoutes.get("/my", getMyOrders);

// Update status of an order
orderRoutes.put("/:orderId/status", updateOrderStatus);

// (Optional) Get single order details
orderRoutes.get("/:orderId", getOrderDetails);

export default orderRoutes;
