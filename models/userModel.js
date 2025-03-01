const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    mobile_number: { type: String, unique: true, required: true,index:true },
    name: { type: String, required: true },
    last_login_time: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
