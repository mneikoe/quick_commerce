const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryBoyController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.use(authMiddleware);
router.use(roleMiddleware(["deliveryboy"]));

router.get("/orders", deliveryController.getMyOrders);
router.put("/orders/:orderId/pickup", deliveryController.confirmPickup);
router.put("/orders/:orderId/deliver", deliveryController.confirmDelivery);
router.post("/location", deliveryController.updateLocation);

module.exports = router;
