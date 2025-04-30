import express from "express";
import {
  placeOrder,
  updateOrderStatus,
  getOrderDetails,
  getMyOrders,
  getOrdersByDate,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const orderRoutes = express.Router();

orderRoutes.use(protect);
orderRoutes.get("/by-date", getOrdersByDate);
orderRoutes.post("/", placeOrder);
orderRoutes.get("/my", getMyOrders);
orderRoutes.put("/:orderId/status", updateOrderStatus);
orderRoutes.get("/:orderId", getOrderDetails);
orderRoutes.get("/by-date", getOrdersByDate);

export default orderRoutes;
