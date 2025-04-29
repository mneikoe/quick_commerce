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
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const menuRoutes = express.Router();

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
