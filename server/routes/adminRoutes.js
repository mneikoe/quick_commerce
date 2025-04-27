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
} from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { Constants } from "../constants/constants.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const adminRoutes = express.Router();

// Apply authentication and admin authorization globally
adminRoutes.use(protect);
// adminRoutes.use(authorizeRoles(Constants.USER.ADMIN));
adminRoutes.use(authorizeRoles(Constants.USER.ADMIN));
console.log(authorizeRoles(Constants.USER.ADMIN));
// Routes for admin actions
adminRoutes.patch("/verify/:userId", verifyUser);
adminRoutes.get("/users", getAllUsers);
// adminRoutes.get("/users", getUsersByRole);

adminRoutes.put("/orders/confirm/:orderId", confirmOrder);
adminRoutes.put("/orders/assign/:orderId", assignOrder);
adminRoutes.get("/orders", getAllOrders);

adminRoutes.route("/categories").get(getAllCategories).post(createCategory); // ✅ no need to re-protect

adminRoutes
  .route("/categories/:id")
  .get(getCategoryById)
  .put(updateCategory) // ✅ no re-protect
  .delete(deleteCategory); // ✅ no re-protect

export default adminRoutes;
