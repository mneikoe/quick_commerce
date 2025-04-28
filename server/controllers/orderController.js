import Order from "../models/Order.js";
import Menu from "../models/Menu.js";

// @desc    Place a new order
// @access  Private (Role: User)
export const placeOrder = async (req, res) => {
  try {
    const menuItems = await Menu.find({ _id: { $in: req.body.items } });

    if (!menuItems.length) {
      return res.status(400).json({ message: "No valid items found." });
    }

    // Optional: You can let user pass item quantities
    const itemQuantities = req.body.quantities || {}; // e.g. { "menuId1": 2 }

    const orderItems = menuItems.map((item) => {
      const quantity = itemQuantities[item._id] || 1;
      return {
        name: item.name,
        price: item.price,
        quantity, // ✅ Required
        menuItem: item._id,
      };
    });

    const totalPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalPrice, // ✅ Required
      deliveryAddress: req.body.deliveryAddress || "Default Address", // ✅ Required
      status: "pending",
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update the order status
// @route   PUT /api/orders/:orderId/status
// @access  Private (Role: Admin/Shopkeeper)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    ).populate("user shopkeeper deliveryBoy");

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Emit real-time update to specific order room
    req.io.to(order._id.toString()).emit("orderUpdate", order);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get details of a specific order
// @route   GET /api/orders/:orderId
// @access  Private (Role: User/Admin)
export const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "user shopkeeper deliveryBoy"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all orders for the logged-in user
// @route   GET /api/orders/myorders
// @access  Private (Role: User)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("shopkeeper deliveryBoy items.menuItem ")
      .sort("-createdAt");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get orders based on role
// @route   GET /api/orders
// @access  Private (User/Admin)
export const getAllOrders = async (req, res) => {
  try {
    let orders;

    if (req.user.role === "admin") {
      orders = await Order.find().populate("user shopkeeper deliveryBoy");
    } else {
      orders = await Order.find({ user: req.user.id }).populate(
        "shopkeeper deliveryBoy"
      );
    }

    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: err.message });
  }
};
