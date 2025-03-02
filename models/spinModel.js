const mongoose = require("mongoose");

const spinSchema = new mongoose.Schema({
  spinCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Spin", spinSchema);