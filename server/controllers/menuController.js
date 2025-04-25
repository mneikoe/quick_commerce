import Menu from "../models/Menu.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import asyncHandler from "express-async-handler";
// @access role:admin
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

    // Populate the 'category' field with the full category details
    const populatedMenuItem = await menuItem.populate("category", "name"); // Ensure 'category' is populated with full details

    // Successfully created the menu item, send it in the response
    res.status(201).json(populatedMenuItem);
  } catch (err) {
    // If an error occurs during creation, it will be caught here
    throw new ErrorHandler(err.message || "Server error", 500); // Catch any unexpected errors
  }
});

// Get all menu items
// @access role:admin
export const getAllMenuItems = asyncHandler(async (req, res) => {
  const menuItems = await Menu.find()
    .populate("category", "name") // Populate the category field with category name
    .populate("createdBy", "name email");
  res.status(200).json({
    success: true,
    data: menuItems,
  });
});

// Get a single menu item by ID
// @access role:admin
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
// @access role:admin
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
// @access role:admin
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
