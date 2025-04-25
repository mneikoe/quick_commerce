import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const { Schema, model } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Soft delete plugin
CategorySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Category = model("Category", CategorySchema);
export default Category;
