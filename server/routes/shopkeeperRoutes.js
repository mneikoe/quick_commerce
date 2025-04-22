const express = require("express");
const router = express.Router();
const shopkeeperController = require("../controllers/shopkeeperController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.use(authMiddleware);
router.use(roleMiddleware(["shopkeeper"]));

router.get("/orders", shopkeeperController.getMyOrders);
router.put("/orders/:orderId/ready", shopkeeperController.confirmOrderReady);

module.exports = router;
