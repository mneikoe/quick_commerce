import express from "express";
import {
  verifyUser,
  confirmOrder,
  assignOrder,
  getAllOrders,
  getAllUsers,
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getUsersByRole,
  createSubcategory,
  getAllSubCategories,
  deleteSubcategory,
} from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { Constants } from "../constants/constants.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { uploadCategoryImage } from "../middlewares/categoryUpload.js";

const adminRoutes = express.Router();

adminRoutes.use(protect);
adminRoutes.use(authorizeRoles(Constants.USER.ADMIN));

adminRoutes.patch("/verify/:userId", verifyUser);
adminRoutes.get("/users", getAllUsers);
adminRoutes.put("/orders/confirm/:orderId", confirmOrder);
adminRoutes.put("/orders/assign/:orderId", assignOrder);
adminRoutes.get("/orders", getAllOrders);
adminRoutes
  .route("/categories")
  .get(getAllCategories)
  .post(uploadCategoryImage, createCategory);
adminRoutes
  .route("/subcategories")
  .get(getAllSubCategories)
  .post(uploadCategoryImage, createSubcategory);
// .post(uploadCategoryImage, updateSub);
adminRoutes
  .route("/subcategory/:id")
  // .get(getAllSubCategories)
  .delete(deleteSubcategory);
// .post(uploadCategoryImage, updateSub);
adminRoutes
  .route("/categories/:id")
  .get(getCategoryById)
  .put(uploadCategoryImage, updateCategory)
  .delete(deleteCategory);

export default adminRoutes;
