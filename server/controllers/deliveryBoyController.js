import { Constants } from "../constants/constants.js";
import Order from "../models/Order.js";

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ deliveryBoy: req.user.id })
      .populate("user shopkeeper items.menuItem deliveryBoy")
      .sort("-createdAt");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const confirmPickup = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update status and timestamp
    order.status = Constants.ORDER_STATUS.PICKEDUP;
    order.statusTimestamps.set(Constants.ORDER_STATUS.PICKEDUP, new Date());

    await order.save();

    const populatedOrder = await Order.findById(order._id).populate(
      "user shopkeeper"
    );

    req.io.to(order._id.toString()).emit("orderUpdate", populatedOrder);
    res.json(populatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const confirmDelivery = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update status and timestamp
    order.status = Constants.ORDER_STATUS.DELIVERED;
    order.statusTimestamps.set(Constants.ORDER_STATUS.DELIVERED, new Date());

    await order.save();

    const populatedOrder = await Order.findById(order._id).populate(
      "user shopkeeper"
    );

    req.io.to(order._id.toString()).emit("orderUpdate", populatedOrder);
    res.json(populatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  left
export const updateLocation = async (req, res) => {
  try {
    const { orderId, lat, lng } = req.body;
    req.io.to(orderId).emit("locationUpdate", { lat, lng });
    res.json({ message: "Location updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
