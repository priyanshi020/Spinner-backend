const { SpinUser, GlobalSpin } = require("../models/spinModel");


const initializeGame = async () => {
  const existingData = await GlobalSpin.findOne();
  if (!existingData) {
    await GlobalSpin.create({ prizeRemaining: 1, betterLuckRemaining: 10 });
  }
};
initializeGame();

// 🌀 Spin Wheel API
const spinWheel = async (req, res) => {
  const { mobile_number } = req.body;

  if (!mobile_number) {
    return res.status(400).json({ message: "Mobile number is required!" });
  }

  try {
   
    let user = await SpinUser.findOne({ mobile_number });
    if (user && user.hasSpun) {
      return res.status(403).json({ message: "You have already spun the wheel!" });
    }

    let globalData = await GlobalSpin.findOne();

    let result;
    if (globalData.prizeRemaining > 0) {
      result = "You won ₹500!";
      globalData.prizeRemaining -= 1;
    } else if (globalData.betterLuckRemaining > 0) {
      result = "Better luck next time!";
      globalData.betterLuckRemaining -= 1;
    } else {
      result = "Sorry, all spins are over!";
    }

    
    if (!user) {
      user = new SpinUser({ mobile_number, hasSpun: true });
    } else {
      user.hasSpun = true;
    }
    await user.save();
    await globalData.save();

    return res.status(200).json({ result });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { spinWheel };
