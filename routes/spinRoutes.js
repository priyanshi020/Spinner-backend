const express = require("express");
const router = express.Router();
const { spinWheel } = require("../controllers/spinController");


router.post("/spin", spinWheel);

module.exports = router;
