import express from "express";
import {
  getMyOrders,
  confirmOrderReady,
} from "../controllers/shopkeeperController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const shopkeeperRoutes = express.Router();

shopkeeperRoutes.use(protect);
shopkeeperRoutes.use(authorizeRoles(["shopkeeper"]));

shopkeeperRoutes.get("/orders/myOrders", getMyOrders);
shopkeeperRoutes.put("/orders/:orderId/ready", confirmOrderReady);

export default shopkeeperRoutes;
