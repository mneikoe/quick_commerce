import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const { Schema, model } = mongoose;

const SubCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    image: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

SubCategorySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const SubCategory = model("SubCategory", SubCategorySchema);
export default SubCategory;
