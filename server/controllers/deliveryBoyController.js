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
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: "pickedup" },
      { new: true }
    ).populate("user shopkeeper");

    req.io.to(order._id.toString()).emit("orderUpdate", order);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const confirmDelivery = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: "delivered" },
      { new: true }
    ).populate("user shopkeeper");

    req.io.to(order._id.toString()).emit("orderUpdate", order);
    res.json(order);
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
