const razorpayInstance = require("../config/razorpay");
const crypto = require("crypto");

// API to create Razorpay Order for UPI payment
exports.createUPIOrder = async (req, res) => {
    const { amount, currency, upi_id } = req.body;

    try {
        // Validate UPI ID
        if (!upi_id || !upi_id.includes("@")) {
            return res.status(400).json({ success: false, message: "Invalid UPI ID" });
        }

        // Create Razorpay order
        const options = {
            amount: amount * 100, // Amount in smallest currency unit (e.g., 50000 paise for 500 INR)
            currency: currency || "INR",
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1, // Auto-capture payments
        };

        const order = await razorpayInstance.orders.create(options);

        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            order,
            upi_id, // Returning UPI ID for simulation
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return res.status(500).json({ success: false, message: "Error creating order" });
    }
};

// API to verify Razorpay Payment
exports.verifyUPIPayment = async (req, res) => {
    const { order_id, payment_id, signature } = req.body;

    try {
        // Generate a signature using Razorpay's secret key
        const generatedSignature = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(order_id + "|" + payment_id)
            .digest("hex");

        if (generatedSignature === signature) {
            return res.status(200).json({
                success: true,
                message: "Payment verified successfully",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed",
            });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({ success: false, message: "Error verifying payment" });
    }
};
