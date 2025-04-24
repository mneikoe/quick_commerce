import Order from "../models/Order.js";

// @desc    Get all orders for the logged-in shopkeeper
// @route   GET /api/orders/shopkeeper/myorders
// @access  Private (Role: Shopkeeper)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ shopkeeper: req.user.id })
      .populate("user deliveryBoy")
      .sort("-createdAt");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Confirm order is ready for pickup
// @route   PUT /api/orders/shopkeeper/:orderId/ready
// @access  Private (Role: Shopkeeper)
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
