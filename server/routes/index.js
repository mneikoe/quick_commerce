import express from "express";
import authRoutes from "./authRoutes.js";
import shopkeeperRoutes from "./shopkeeperRoutes.js";
import adminRoutes from "./adminRoutes.js";
import deliveryRoutes from "./deliveryRoutes.js";
import orderRoutes from "./orderRoutes.js";
import userRoutes from "./userRoutes.js";
import menuRoutes from "./menuRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/shopkeeper", shopkeeperRoutes);
router.use("/delivery", deliveryRoutes);
router.use("/orders", orderRoutes);
router.use("/user", userRoutes);
router.use("/menu", menuRoutes);

export default router;
