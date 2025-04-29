import express from "express";
import {
  placeOrder,
  updateOrderStatus,
  getOrderDetails,
  getMyOrders,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const orderRoutes = express.Router();

orderRoutes.use(protect);

orderRoutes.post("/", placeOrder);
orderRoutes.get("/my", getMyOrders);
orderRoutes.put("/:orderId/status", updateOrderStatus);
orderRoutes.get("/:orderId", getOrderDetails);

export default orderRoutes;
