const User = require("../models/User");
const Menu = require("../models/Menu");
const Order = require("../models/Order");

exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isVerified: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: `$(user.role) is verified `, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.confirmOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: "confirmed" },
      { new: true }
    );
    req.io.emit("orderUpdate", order);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.assignOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        status: "assigned",
        shopkeeper: req.body.shopkeeperId,
        deliveryBoy: req.body.deliveryBoyId,
        assignedBy: req.user.id,
      },
      { new: true }
    ).populate("shopkeeper deliveryBoy");

    // Use the io instance from app locals
    req.io.emit("orderUpdate", order);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user shopkeeper deliveryBoy")
      .sort("-createdAt");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
