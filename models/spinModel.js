const mongoose = require("mongoose");

const spinUserSchema = new mongoose.Schema({
  mobile_number: { type: String, required: true, unique: true },
  hasSpun: { type: Boolean, default: false },
});
const SpinUser = mongoose.model("SpinUser", spinUserSchema);

const globalSpinSchema = new mongoose.Schema({
  prizeRemaining: { type: Number, default: 1 },
  betterLuckRemaining: { type: Number, default: 10 },
});
const GlobalSpin = mongoose.model("GlobalSpin", globalSpinSchema);

module.exports = { SpinUser, GlobalSpin };
