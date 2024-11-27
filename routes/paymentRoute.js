const express = require("express");
const { createUPIOrder, verifyUPIPayment } = require("../controllers/paymentController");

const router = express.Router();

// Route to create Razorpay UPI Order
router.post("/upi/create-order", createUPIOrder);

// Route to verify Razorpay UPI Payment
router.post("/upi/verify-payment", verifyUPIPayment);

module.exports = router;
