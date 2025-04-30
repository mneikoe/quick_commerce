import { Constants } from "../constants/constants.js";
import Order from "../models/Order.js";

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ shopkeeper: req.user.id })
      .populate("user deliveryBoy items.menuItem")
      .sort("-createdAt");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const confirmOrderReady = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update status and timestamp
    order.status = Constants.ORDER_STATUS.READY;
    order.statusTimestamps.set(Constants.ORDER_STATUS.READY, new Date());

    await order.save();

    const populatedOrder = await Order.findById(order._id).populate(
      "user deliveryBoy"
    );

    req.io.emit("orderUpdate", populatedOrder);
    res.json(populatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
