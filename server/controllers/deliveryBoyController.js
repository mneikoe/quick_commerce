import Order from "../models/Order.js";

// @desc    Get all orders assigned to the delivery boy
// @route   GET /api/delivery/orders
// @access  Private (Role: DeliveryBoy)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ deliveryBoy: req.user.id })
      .populate("user shopkeeper")
      .sort("-createdAt");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Confirm order pickup by the delivery boy
// @route   PUT /api/delivery/orders/:orderId/pickup
// @access  Private (Role: DeliveryBoy)
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

// @desc    Confirm order delivery by the delivery boy
// @route   PUT /api/delivery/orders/:orderId/deliver
// @access  Private (Role: DeliveryBoy)
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

// @desc    Update the location of the delivery boy in real-time
// @route   POST /api/delivery/location
// @access  Private (Role: DeliveryBoy)
export const updateLocation = async (req, res) => {
  try {
    const { orderId, lat, lng } = req.body;
    req.io.to(orderId).emit("locationUpdate", { lat, lng });
    res.json({ message: "Location updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
