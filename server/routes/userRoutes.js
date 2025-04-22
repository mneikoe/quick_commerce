const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.use(authMiddleware);
router.use(roleMiddleware(["user"]));

router.get("/menu", userController.getMenu);
router.post("/orders", userController.placeOrder);
router.get("/orders", userController.getMyOrders);
router.get("/orders/:orderId/track", userController.trackOrder);

module.exports = router;
