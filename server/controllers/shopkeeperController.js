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
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: "ready" },
      { new: true }
    ).populate("user deliveryBoy");

    req.io.emit("orderUpdate", order);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
