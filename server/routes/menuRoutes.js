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
import { uploadMenuImage } from "../middlewares/upload.js";
import { getAllCategories } from "../controllers/adminController.js";

const menuRoutes = express.Router();

menuRoutes
  .route("/")
  .post(
    protect,
    authorizeRoles(Constants.USER.ADMIN),
    uploadMenuImage,
    createMenuItem
  )
  .get(getAllMenuItems);
menuRoutes.get("/categories", getAllCategories);

menuRoutes
  .route("/:id")
  .get(protect, authorizeRoles(Constants.USER.ADMIN), getMenuItemById)
  .put(
    protect,
    authorizeRoles(Constants.USER.ADMIN),
    uploadMenuImage,
    updateMenuItem
  )
  .delete(protect, authorizeRoles(Constants.USER.ADMIN), deleteMenuItem);

export default menuRoutes;
