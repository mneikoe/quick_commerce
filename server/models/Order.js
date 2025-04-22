const mongoose = require("mongoose");
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
        quantity: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "assigned",
        "ready",
        "pickedup",
        "delivered",
      ],
      default: "pending",
    },
    totalPrice: { type: Number, required: true },
    deliveryAddress: { type: String, required: true },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
