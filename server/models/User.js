import mongoose from "mongoose";
import { Constants } from "../constants/constants.js";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, sparse: true },
  password: String,
  phone: { type: Number, unique: true, sparse: true },
  address: String,
  role: { type: String, enum: Object.values(Constants.USER) },
  isVerified: { type: Boolean, default: false },
  status: {
    type: String,
    enum: Object.values(Constants.STATUS),
    default: Constants.STATUS.ACTIVE,
  },
});

export default mongoose.model("User", userSchema); // Using export default instead of module.exports
