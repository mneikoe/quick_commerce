import express from "express";
import {
  verifyUser,
  createMenuItem,
  confirmOrder,
  assignOrder,
  getAllOrders,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
  getAllUsers,
} from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { Constants } from "../constants/constants.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js"; // Ensure to import the role middleware

const adminRoutes = express.Router();

// Apply authentication middleware
adminRoutes.use(protect);

// Apply role-based authorization middleware
adminRoutes.use(authorizeRoles(Constants.USER.ADMIN)); // Use the role middleware with the role constant

// Routes for admin actions
adminRoutes.patch("/verify/:userId", verifyUser);
adminRoutes.get("/users", getAllUsers);
// adminRoutes.post("/menu", createMenuItem);
adminRoutes
  .route("/menu")
  .post(protect, createMenuItem)
  .get(protect, getAllMenuItems);

adminRoutes
  .route("/menu/:id")
  .get(protect, getMenuItemById)
  .put(protect, updateMenuItem)
  .delete(protect, deleteMenuItem);
adminRoutes.put("/orders/confirm/:orderId", confirmOrder);
adminRoutes.put("/orders/assign/:orderId", assignOrder);
adminRoutes.get("/orders", getAllOrders);

export default adminRoutes;
