const Spin = require("../models/spinModel");
const prizes = ["₹ 18/-", "₹ 10/-", "₹ 15/-", "₹ 20/-", "₹ 12/-"];

exports.spinWheel = async (req, res) => {
  try {
    let spinData = await Spin.findOne();
    if (!spinData) {
      spinData = await Spin.create({ spinCount: 0 });
    }

    spinData.spinCount += 1;
    let result = "Better luck";
    
    if (spinData.spinCount % 10 === 0) {
      result = prizes[Math.floor(Math.random() * prizes.length)];
    }

    await spinData.save();
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};