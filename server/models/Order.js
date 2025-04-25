import mongoose from "mongoose";
import { Constants } from "../constants/constants.js"; // Assuming you have a constants file

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shopkeeper: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deliveryBoy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
    totalPrice: { type: Number, required: true },
    // deliveryAddress: { type: String, required: true },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema); // Using export default instead of module.exports
