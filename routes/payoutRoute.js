const express = require("express");
const { initiatePayout } = require("../controllers/payoutController");

const router = express.Router();

// POST /api/payouts
router.post("/send", initiatePayout);

module.exports = router;
