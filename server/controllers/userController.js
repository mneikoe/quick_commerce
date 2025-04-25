import Menu from "../models/Menu.js";
import Order from "../models/Order.js";

// @desc    Get all available menu items
// @route   GET /api/menu
// @access  Public

export const getMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find({ isAvailable: true });
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Place an order
// @route   POST /api/orders
// @access  Private
export const placeOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user.id,
      items: req.body.items,
      totalPrice: req.body.totalPrice,
      deliveryAddress: req.body.deliveryAddress,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all orders of the logged-in user
// @route   GET /api/orders/myorders
// @access  Private(role: user)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("shopkeeper deliveryBoy")
      .sort("-createdAt");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Track an order
// @route   GET /api/orders/:orderId/track
// @access  Private
export const trackOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "shopkeeper deliveryBoy"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
