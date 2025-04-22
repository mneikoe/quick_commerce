const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.use(authMiddleware);
router.use(roleMiddleware(["admin"]));

router.put("/verify/:userId", adminController.verifyUser);
router.post("/menu", adminController.createMenuItem);
router.put("/orders/confirm/:orderId", adminController.confirmOrder);
router.put("/orders/assign/:orderId", adminController.assignOrder);
router.get("/orders", adminController.getAllOrders);

module.exports = router;
