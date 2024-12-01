const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema({
  contactId: { type: String, required: true },
  fundAccountId: { type: String, required: true },
  payoutId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "processing" },
  createdAt: { type: Date, default: Date.now },
});

const Payout = mongoose.model("Payout", payoutSchema);

module.exports = Payout;
