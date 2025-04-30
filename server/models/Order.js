import mongoose from "mongoose";
import { Constants } from "../constants/constants.js";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shopkeeper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    deliveryBoy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: { type: Number },
      },
    ],
    status: {
      type: String,
      enum: Object.values(Constants.ORDER_STATUS),
      default: Constants.ORDER_STATUS.PENDING,
    },
    statusTimestamps: {
      type: Map,
      of: Date,
      default: {},
    },
    totalPrice: { type: Number, required: true },
    // deliveryAddress: { type: String, required: true },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
