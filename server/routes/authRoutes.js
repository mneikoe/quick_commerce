import express from "express";
import { register, login } from "../controllers/authController.js";
import {
  logout,
  refresh,
  // forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { validateRegister } from "../middlewares/validate.js";
import { protect } from "../middlewares/authMiddleware.js";

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
// authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/reset-password/:token", resetPassword);

export default authRoutes;
