import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Menu item name is required"],
      minlength: [3, "Menu item name must be at least 3 characters long"],
      maxlength: [100, "Menu item name must not exceed 100 characters"],
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive value"],
      validate: {
        validator: function (v) {
          return v % 1 === 0 || (v * 100) % 1 === 0; // Ensure that price is either a whole number or has two decimal places
        },
        message: "Price must be a valid number with up to two decimal places",
      },
    },
    category: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Menu", menuSchema);
