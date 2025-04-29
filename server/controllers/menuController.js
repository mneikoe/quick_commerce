import Menu from "../models/Menu.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import asyncHandler from "express-async-handler";

export const createMenuItem = asyncHandler(async (req, res) => {
  try {
    const menuItem = await Menu.create({
      ...req.body,
      createdBy: req.user.id,
    });

    if (!menuItem) {
      throw new ErrorHandler("Menu item creation failed", 400);
    }

    const populatedMenuItem = await menuItem.populate("category", "name");

    res.status(201).json(populatedMenuItem);
  } catch (err) {
    throw new ErrorHandler(err.message || "Server error", 500);
  }
});

export const getAllMenuItems = asyncHandler(async (req, res) => {
  const menuItems = await Menu.find()
    .populate("category", "name")
    .populate("createdBy", "name email");
  res.status(200).json({
    success: true,
    data: menuItems,
  });
});

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
