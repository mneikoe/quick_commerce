import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Menu from "../models/Menu.js";
import Order from "../models/Order.js";
// import { ErrorHandler } from "../utils/errorHandlerUtils.js";
import { Constants } from "../constants/constants.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import APIFeatures from "../utils/apiFeatures.js";
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
export const createMenuItem = asyncHandler(async (req, res) => {
  try {
    // Create the menu item
    const menuItem = await Menu.create({
      ...req.body,
      createdBy: req.user.id, // Assuming `req.user` is populated from your `protect` middleware
    });

    if (!menuItem) {
      throw new ErrorHandler("Menu item creation failed", 400); // Custom error if menuItem creation fails
    }

    // Successfully created the menu item, send it in the response
    res.status(201).json(menuItem);
  } catch (err) {
    // If an error occurs during creation, it will be caught here
    throw new ErrorHandler(err.message || "Server error", 500); // Catch any unexpected errors
  }
});

// Get all menu items
export const getAllMenuItems = asyncHandler(async (req, res) => {
  const menuItems = await Menu.find().populate("createdBy", "name email");
  res.status(200).json({
    success: true,
    data: menuItems,
  });
});

// Get a single menu item by ID
export const getMenuItemById = asyncHandler(async (req, res, next) => {
  const menuItem = await Menu.findById(req.params.id);

  if (!menuItem) {
    return next(new ErrorHandler("Menu item not found", 404));
  }

  res.status(200).json({
    success: true,
    data: menuItem,
  });
});

// Update a menu item
export const updateMenuItem = asyncHandler(async (req, res, next) => {
  const menuItem = await Menu.findById(req.params.id);

  if (!menuItem) {
    return next(new ErrorHandler("Menu item not found", 404));
  }

  const updatedFields = req.body;

  const updatedItem = await Menu.findByIdAndUpdate(
    req.params.id,
    { $set: updatedFields },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Menu item updated successfully",
    data: updatedItem,
  });
});

// Delete a menu item
export const deleteMenuItem = asyncHandler(async (req, res, next) => {
  const menuItem = await Menu.findById(req.params.id);

  if (!menuItem) {
    return next(new ErrorHandler("Menu item not found", 404));
  }

  await menuItem.deleteOne();

  res.status(200).json({
    success: true,
    message: "Menu item deleted successfully",
  });
});

// @desc    Confirm order
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
