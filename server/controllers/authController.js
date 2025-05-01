import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { Constants } from "../constants/constants.js";
import { generateToken } from "../utils/generateToken.js";
import Order from "../models/Order.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, phone, address, password, role } = req.body;

  if (!email && !phone) {
    res.status(400);
    throw new Error("Either email or phone must be provided.");
  }
  if (email && (email === null || email.trim() === "")) {
    res.status(400);
    throw new Error("Invalid email provided.");
  }

  if (!Object.values(Constants.USER).includes(role)) {
    res.status(400);
    throw new Error("Invalid role specified.");
  }

  let userExists;
  if (email) {
    userExists = await User.findOne({ email });
    if (userExists) {
      res.status(409);
      throw new Error("Email already in use.");
    }
  }

  if (phone) {
    userExists = await User.findOne({ phone });
    if (userExists) {
      res.status(409);
      throw new Error("Phone number already in use.");
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    name,
    email,
    address,
    password: hashedPassword,
    role,
  };

  if (phone) {
    userData.phone = phone;
  }
  if (email) {
    userData.email = email;
  }

  const user = await User.create(userData);
  const token = generateToken(user);
  res.status(201).json({
    message: `${user.role} registered successfully`,
    token: token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!user.status) {
    return res
      .status(403)
      .json({ message: "User account is inactive. Please contact support." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new Error("Refresh token missing");

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) throw new Error("User not found");

  const newToken = generateToken(user);
  res.json({ token: newToken });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully" });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpire: { $gt: Date.now() },
  });

  if (!user) throw new Error("Invalid or expired token");

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;
  await user.save();

  res.json({ message: "Password updated successfully" });
});

export const getMyOrders = async (req, res) => {
  try {
    let query = {};
    let populateFields = "";

    if (req.user.role === Constants.USER.SHOPKEEPER) {
      query = { shopkeeper: req.user.id };
      populateFields = "user deliveryBoy items.menuItem";
    } else if (req.user.role === Constants.USER.USER) {
      query = { user: req.user.id };
      populateFields = "shopkeeper deliveryBoy items.menuItem";
    } else if (req.user.role === Constants.USER.DELIVERYBOY) {
      query = { deliveryBoy: req.user.id };
      populateFields = "user shopkeeper items.menuItem";
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }

    const orders = await Order.find(query)
      .populate(populateFields)
      .sort("-createdAt");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
