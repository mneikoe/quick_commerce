import express from "express";
import {
  getMenu,
  placeOrder,
  getMyOrders,
  trackOrder,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { Constants } from "../constants/constants.js";

const userRoutes = express.Router();

userRoutes.use(protect);
userRoutes.use(authorizeRoles(Constants.USER.USER));

userRoutes.get("/menu", getMenu);
userRoutes.post("/orders", placeOrder);
userRoutes.get("/orders/myOrders", getMyOrders);
userRoutes.get("/orders/:orderId/track", trackOrder);

export default userRoutes;
