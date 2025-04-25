import express from "express";
import {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { Constants } from "../constants/constants.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js"; // Ensure to import the role middleware

const menuRoutes = express.Router();

// Apply authentication middleware
// menuRoutes.use(protect);

// Apply role-based authorization middleware
// menuRoutes.use(authorizeRoles(Constants.USER.ADMIN)); // Use the role middleware with the role constant

// menuRoutes.post("/menu", createMenuItem);
menuRoutes
  .route("/")
  .post(protect, authorizeRoles(Constants.USER.ADMIN), createMenuItem)
  .get(getAllMenuItems);

menuRoutes
  .route("/:id")
  .get(protect, authorizeRoles(Constants.USER.ADMIN), getMenuItemById)
  .put(protect, authorizeRoles(Constants.USER.ADMIN), updateMenuItem)
  .delete(protect, authorizeRoles(Constants.USER.ADMIN), deleteMenuItem);

export default menuRoutes;
