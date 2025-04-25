import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Menu from "../models/Menu.js";
import Order from "../models/Order.js";
// import { ErrorHandler } from "../utils/errorHandlerUtils.js";
import { Constants } from "../constants/constants.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import APIFeatures from "../utils/apiFeatures.js";
import Category from "../models/Category.js";
// import { ErrorHandler } from "../middlewares/errorMiddleware.js";

// @desc    Get all users (admin only)
export const getAllUsers = asyncHandler(async (req, res) => {
  const features = new APIFeatures(User.find(), req.query)
    .search(["name", "email"])
    .filter()
    .dateRange("createdAt")
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;
  const total = await User.countDocuments();

  res.json({
    success: true,
    total,
    count: users.length,
    users,
  });
});

// @desc    Verify user
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
// @desc    Create menu item

// @desc    Confirm order
// @access role:admin
export const confirmOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.orderId,
    { status: Constants.ORDER_STATUS.CONFIRMED },
    { new: true }
  );
  console.log(ErrorHandler);

  if (!order) {
    throw new ErrorHandler("Order not found", 404);
  }

  req.io.emit("orderUpdate", order);

  res.json(order);
});

// @desc    Assign order to shopkeeper and delivery boy
export const assignOrder = asyncHandler(async (req, res) => {
  const { shopkeeperId, deliveryBoyId } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.orderId,
    {
      status: Constants.ORDER_STATUS.ASSIGNED,
      shopkeeper: shopkeeperId,
      deliveryBoy: deliveryBoyId,
      assignedBy: req.user.id,
    },
    { new: true }
  ).populate("shopkeeper deliveryBoy");

  if (!order) {
    throw new ErrorHandler("Order not found", 404);
  }

  req.io.emit("orderUpdate", order);

  res.json(order);
});

// @desc    Get all orders
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user shopkeeper deliveryBoy")
    .sort("-createdAt");

  res.json(orders);
});

// Create a category
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

// get all categories
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    data: categories,
  });
});

// get single category
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new ErrorHandler("Category not found", 404);
  }

  res.status(200).json({ success: true, data: category });
});

// update category
export const updateCategory = asyncHandler(async (req, res) => {
  const { name, description, status } = req.body;

  const category = await Category.findById(req.params.id);
  if (!category) throw new ErrorHandler("Category not found", 404);

  category.name = name ?? category.name;
  category.description = description ?? category.description;
  category.status = status ?? category.status;

  const updated = await category.save();

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: updated,
  });
});

// delete category
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new ErrorHandler("Category not found", 404);

  await category.delete(); // soft delete

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});
