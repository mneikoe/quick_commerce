import express from "express";
import {
  getMyOrders,
  confirmOrderReady,
} from "../controllers/shopkeeperController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const shopkeeperRoutes = express.Router();

// Apply auth and role-based authorization middleware
shopkeeperRoutes.use(protect);
shopkeeperRoutes.use(authorizeRoles(["shopkeeper"]));

// Routes for shopkeeper actions
shopkeeperRoutes.get("/orders", getMyOrders);
shopkeeperRoutes.put("/orders/:orderId/ready", confirmOrderReady);

export default shopkeeperRoutes;
