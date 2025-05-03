import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    unit: {
      type: String,
    },
    stock: {
      type: Number,
    },
    comment: {
      type: String,
      maxlength: [500, "Review cannot exceed 500 characters"],
    },
  },
  { timestamps: true }
);

const menuSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      minlength: [3, "Product title must be at least 3 characters long"],
      maxlength: [100, "Product title must not exceed 100 characters"],
    },
    description: {
      type: String,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive value"],
      validate: {
        validator: function (v) {
          return v % 1 === 0 || (v * 100) % 1 === 0;
        },
        message: "Price must be a valid number with up to two decimal places",
      },
    },
    mrp: {
      type: Number,
      min: [0, "MRP must be a positive value"],
      validate: {
        validator: function (v) {
          return v % 1 === 0 || (v * 100) % 1 === 0;
        },
        message: "MRP must be a valid number with up to two decimal places",
      },
    },
    discount: {
      type: Number,
      min: [0, "Discount must be a positive value"],
      max: [100, "Discount cannot exceed 100"],
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
    },
    unit: {
      type: String,
      required: [true, "Unit is required (e.g., ml, kg)"],
    },
    images: {
      type: [String],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "Product must have at least one image",
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    reviews: [reviewSchema],
    stockQuantity: {
      type: Number,
      default: 0,
      min: [0, "Stock quantity cannot be negative"],
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
    deliveryDetails: {
      availability: {
        type: String,
        enum: ["In stock", "Out of stock", "Pre-order"],
        default: "In stock",
      },
      estimatedDelivery: {
        type: String,
        default: "2-3 days",
      },
      deliveryFee: {
        type: Number,
        default: 50,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Menu", menuSchema);
