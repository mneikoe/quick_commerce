import express from "express";
import { register, login, getMyOrders } from "../controllers/authController.js";
import {
  logout,
  refresh,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});
authRoutes.post("/logout", logout);
authRoutes.post("/refresh", refresh);
authRoutes.post("/reset-password/:token", resetPassword);
authRoutes.get("/orders", protect, getMyOrders);

export default authRoutes;
