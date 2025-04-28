import express from "express";
import {
  getMyOrders,
  confirmPickup,
  confirmDelivery,
  updateLocation,
} from "../controllers/deliveryBoyController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { Constants } from "../constants/constants.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const deliveryRoutes = express.Router();

// Apply authentication and role-based authorization middleware
deliveryRoutes.use(protect);
deliveryRoutes.use(authorizeRoles(Constants.USER.DELIVERYBOY));

// Routes for delivery boy actions
deliveryRoutes.get("/orders/myOrders", getMyOrders);
deliveryRoutes.put("/orders/:orderId/pickup", confirmPickup);
deliveryRoutes.put("/orders/:orderId/deliver", confirmDelivery);
deliveryRoutes.post("/location", updateLocation);

export default deliveryRoutes;
