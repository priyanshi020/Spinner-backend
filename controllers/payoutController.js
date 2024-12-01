const axios = require("axios");
const Payout = require("../models/payoutModel");

require("dotenv").config();

const createContact = async (name, email, contactNumber) => {
    try {
      const response = await axios.post(
        "https://api.razorpay.com/v1/contacts",
        {
          name,
          email,
          contact: contactNumber,
          type: "customer",
          reference_id: `ref_${Date.now()}`,
          notes: { purpose: "Prize Payment" },
        },
        {
          auth: {
            username: process.env.KEY_ID,
            password: process.env.KEY_SECRET,
          },
        }
      );
      console.log("Contact Created:", response.data);
      return response.data.id;
    } catch (error) {
      console.error("Error in createContact:", error.response?.data || error.message);
      throw error;
    }
  };
  

  const addFundAccount = async (contactId, upiId) => {
    try {
      const response = await axios.post(
        "https://api.razorpay.com/v1/fund_accounts",
        {
          contact_id: contactId,
          account_type: "vpa",
          vpa: { address: upiId },
        },
        {
          auth: {
            username: process.env.KEY_ID,
            password: process.env.KEY_SECRET,
          },
        }
      );
      console.log("Fund Account Added:", response.data);
      return response.data.id;
    } catch (error) {
      console.error("Error in addFundAccount:", error.response?.data || error.message);
      throw error;
    }
  };
  

  const createPayout = async (fundAccountId, amount) => {
    try {
      const response = await axios.post(
        "https://api.razorpay.com/v1/payouts",
        {
          account_number: process.env.ACCOUNT_NUMBER,
          fund_account_id: fundAccountId,
          amount,
          currency: "INR",
          mode: "UPI",
          purpose: "payout",
          queue_if_low_balance: true,
          reference_id: `payout_${Date.now()}`,
          narration: "Prize Money",
          notes: { additional_info: "Prize payout for the contest" },
        },
        {
          auth: {
            username: process.env.KEY_ID,
            password: process.env.KEY_SECRET,
          },
        }
      );
      console.log("Payout Created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in createPayout:", error.response?.data || error.message);
      throw error;
    }
  };
  

  exports.initiatePayout = async (req, res) => {
    const { name, email, contactNumber, upiId, amount } = req.body;
  
    if (!name || !email || !contactNumber || !upiId || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, contactNumber, upiId, or amount",
      });
    }
  
    try {
      // Step 1: Create Contact
      console.log("Step 1: Creating Contact...");
      const contactId = await createContact(name, email, contactNumber);
  
      // Step 2: Add Fund Account
      console.log("Step 2: Adding Fund Account...");
      const fundAccountId = await addFundAccount(contactId, upiId);
  
      // Step 3: Create Payout
      console.log("Step 3: Creating Payout...");
      const payoutResponse = await createPayout(fundAccountId, amount);
  
      res.status(200).json({
        success: true,
        message: "Payout processed successfully!",
        payout: payoutResponse,
      });
    } catch (error) {
      console.error("Error during payout process:", error.response?.data || error.message);
      res.status(500).json({
        success: false,
        message: error.response?.data || error.message,
      });
    }
  };
  
