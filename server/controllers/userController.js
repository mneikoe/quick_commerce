import Menu from "../models/Menu.js";
import Order from "../models/Order.js";

export const getMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find({ isAvailable: true });
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const placeOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user.id,
      items: req.body.items,
      totalPrice: req.body.totalPrice,
      deliveryAddress: req.user.address || req.body,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  console.log("req.user:", req.user);

  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("shopkeeper deliveryBoy items.menuItem")
      .sort("-createdAt");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
