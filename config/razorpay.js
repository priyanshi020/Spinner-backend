const Razorpay = require("razorpay");

const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_PZTDP6jXKZdcgB', // Replace with Razorpay Key ID
    key_secret: '1yNG9cTNGDpNesoXH3zDHUm7', // Replace with Razorpay Secret
});

module.exports = razorpayInstance;
