import express from "express";
import { register, login, getMyOrders } from "../controllers/authController.js";
import {
  logout,
  refresh,
  // forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
// import { validateRegister } from "../middlewares/validate.js";
import { protect } from "../middlewares/authMiddleware.js";
// import { getMyOrders } from "../controllers/userController.js";

const authRoutes = express.Router();

// Routes for authentication actions
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
