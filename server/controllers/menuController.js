import Menu from "../models/Menu.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
export const createMenuItem = asyncHandler(async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    console.log(req.body);
    console.log(
      `${req.protocol}://${req.get("host")}/uploads/menu/${req.file.filename}`
    );
    let imagePath = "";
    if (req.file) {
      imagePath = `${req.protocol}://${req.get("host")}/uploads/menu/${
        req.file.filename
      }`;
    }

    const menuItem = await Menu.create({
      title,
      description,
      price,
      category,
      createdBy: req.user.id,
      image: imagePath,
    });

    if (!menuItem) {
      throw new ErrorHandler("Menu item creation failed", 400);
    }

    const populatedMenuItem = await menuItem.populate("category");

    res.status(201).json(populatedMenuItem);
  } catch (err) {
    throw new ErrorHandler(err.message || "Server error", 500);
  }
});

export const getAllMenuItems = asyncHandler(async (req, res) => {
  const menuItems = await Menu.find()
    .populate("category")
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
  console.log(req.body);
  if (!menuItem) {
    return next(new ErrorHandler("Menu item not found", 404));
  }
  
  if (
    req.body.category &&
    !mongoose.Types.ObjectId.isValid(req.body.category)
  ) {
    return next(new ErrorHandler("Invalid category ID", 400));
  }

  // Prepare updated fields
  const updatedFields = {
    title: req.body.title || menuItem.title,
    description: req.body.description || menuItem.description,
    price: req.body.price || menuItem.price,
    category: req.body.category || menuItem.category,
    isAvailable:
      typeof req.body.isAvailable !== "undefined"
        ? req.body.isAvailable
        : menuItem.isAvailable,
  };

  // Handle image update
  if (req.file) {
    const oldImagePath = menuItem.image?.split("/uploads/menu/")[1];
    if (oldImagePath) {
      const fullPath = path.join("uploads", "menu", oldImagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    updatedFields.image = `${req.protocol}://${req.get("host")}/uploads/menu/${
      req.file.filename
    }`;
  }

  const updatedItem = await Menu.findByIdAndUpdate(
    req.params.id,
    { $set: updatedFields },
    { new: true, runValidators: true }
  ).populate("category");

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

  // Delete image from disk
  const imagePath = menuItem.image?.split("/uploads/menu/")[1];
  if (imagePath) {
    const fullPath = path.join("uploads", "menu", imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }

  await menuItem.deleteOne();

  res.status(200).json({
    success: true,
    message: "Menu item deleted successfully",
  });
});
