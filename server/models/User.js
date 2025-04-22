const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: { type: Number, unique: true },
  address: String,
  role: { type: String, enum: ["admin", "user", "shopkeeper", "deliveryboy"] },
  isVerified: { type: Boolean, default: false },
});
module.exports = mongoose.model("User", userSchema);
