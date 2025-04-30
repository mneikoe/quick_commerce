import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Menu from "../models/Menu.js";
import Order from "../models/Order.js";
import { Constants } from "../constants/constants.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import APIFeatures from "../utils/apiFeatures.js";
import Category from "../models/Category.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const features = new APIFeatures(User.find(), req.query)
      .search(["name", "email", "role"])
      .filter()
      .dateRange("createdAt")
      .sort();

    if (req.query.role) {
      let roles = req.query.role;
      if (!Array.isArray(roles)) {
        roles = roles.split(",");
      }
      features.query = features.query.find({ role: { $in: roles } });
    }

    const users = await features.query;

    const total = await User.countDocuments();

    res.json({
      success: true,
      total,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching users, please try again later.",
    });
  }
});

export const verifyUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { isVerified: true },
    { new: true }
  );

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  res.json({ message: `${user.role} is verified`, user });
});

export const confirmOrder = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    order.status = Constants.ORDER_STATUS.CONFIRMED;
    order.statusTimestamps.set(Constants.ORDER_STATUS.CONFIRMED, new Date());

    await order.save();

    req.io.emit("orderUpdate", order);

    res.json({
      success: true,
      message: "Order confirmed successfully",
      order,
    });
  } catch (error) {
    console.error("Error confirming order:", error);
    return next(new ErrorHandler("Error while confirming order.", 500));
  }
});

export const assignOrder = asyncHandler(async (req, res, next) => {
  try {
    const { shopkeeperId, deliveryBoyId } = req.body;

    if (!shopkeeperId || !deliveryBoyId) {
      return next(
        new ErrorHandler("Shopkeeper and Delivery Boy are required", 400)
      );
    }

    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    // Update status, assignees, and timestamp
    order.status = Constants.ORDER_STATUS.ASSIGNED;
    order.shopkeeper = shopkeeperId;
    order.deliveryBoy = deliveryBoyId;
    order.assignedBy = req.user.id;
    order.statusTimestamps.set(Constants.ORDER_STATUS.ASSIGNED, new Date());

    await order.save();

    const populatedOrder = await Order.findById(order._id).populate(
      "shopkeeper deliveryBoy items.menuItem"
    );

    req.io.emit("orderUpdate", populatedOrder);

    res.json({
      success: true,
      message: "Order assigned successfully",
      order: populatedOrder,
    });
  } catch (error) {
    console.error("Error assigning order:", error);
    return next(new ErrorHandler("Error while assigning order.", 500));
  }
});

export const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user shopkeeper deliveryBoy items.menuItem")
      .sort("-createdAt");
    res.json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500);
    throw new Error("Failed to fetch orders. Please try again later.", error);
  }
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, description, status } = req.body;

  const existing = await Category.findOne({ name });
  if (existing) {
    throw new ErrorHandler("Category already exists", 400);
  }

  const category = await Category.create({
    name,
    description,
    status,
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    data: categories,
  });
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new ErrorHandler("Category not found", 404);
  }

  res.status(200).json({ success: true, data: category });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { name, description, status } = req.body;

  const category = await Category.findById(req.params.id);
  if (!category) throw new ErrorHandler("Category not found", 404);

  const menuItems = await Menu.find({ category: category._id });
  if (menuItems.length > 0 && status === "inactive") {
    throw new ErrorHandler(
      "Cannot update category status to 'inactive' because it has associated menu items.",
      400
    );
  }

  category.name = name ?? category.name;
  category.description = description ?? category.description;
  category.status = status ?? category.status;

  const updated = await category.save();

  if (name || description) {
    await Menu.updateMany(
      { category: category._id },
      { $set: { categoryName: name, categoryDescription: description } }
    );
  }

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: updated,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new ErrorHandler("Category not found", 404);

  const menuItems = await Menu.find({ category: category._id });
  if (menuItems.length > 0) {
    throw new ErrorHandler(
      "Cannot delete category because it has associated menu items.",
      400
    );
  }

  await category.delete();

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});

export const getUsersByRole = asyncHandler(async (req, res) => {
  const role = req.query.role;

  if (!role || !["shopkeeper", "deliveryBoy"].includes(role)) {
    throw new ErrorHandler("Invalid or missing role", 400);
  }

  const users = await User.find({ role }).select("_id name email");

  res.json(users);
});
