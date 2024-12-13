const axios = require('axios');
const { validateBeneficiary } = require('../models/cashfreeModel');
const {BASE_URL} = require('../config/cashfree')
// Add Beneficiary
// const addBeneficiary = async (req, res) => {
//     const { beneficiary_id, beneficiary_name, email, phone, vpa } = req.body;
  
//     try {
//       const response = await axios.post('https://sandbox.cashfree.com/payout/beneficiary', {
//         beneficiary_id, beneficiary_name, email, phone, vpa
//       }, {
//         headers: {
//           'x-client-id': process.env.CLIENT_ID,
//           'x-client-secret': process.env.CLIENT_SECRET,
//           'x-api-version': '2024-01-01',
//           'accept':'application/json',
//           'Content-Type':'application/json'
//         }
//       });
  
//       res.status(200).json(response.data);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
const addBeneficiary = async (req, res) => {
  try {
   
    const {
      beneficiary_id,
      beneficiary_name,
      email,
      beneficiary_contact_details,
      vpa
    } = req.body;

   
    if (!beneficiary_id || !beneficiary_name || !email || !beneficiary_contact_details || !vpa) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const payload = {
      beneficiary_id,
      beneficiary_name,
      email,
      beneficiary_contact_details,
      vpa
    };

    
    const response = await axios.post(`${BASE_URL}/beneficiary`, payload, {
      headers: {
        'x-client-id': process.env.CLIENT_ID,
        'x-client-secret': process.env.CLIENT_SECRET,
        'x-api-version': '2024-01-01',
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json({ message: 'Beneficiary added successfully.', data: response.data });

  } catch (error) {
   
    if (error.response) {
     
      return res.status(error.response.status).json({
        error: error.response.data.message || 'Cashfree API error.',
        details: error.response.data
      });
      console.log('error bhi btao',error.response)
    } else {
     
      return res.status(500).json({
        error: 'Internal server error.',
        details: error.message
      });
      console.log('errrorrr')
    }
  }
};

  

// Make Payout
const initiateTransfer = async (req, res) => {
  try {
 
    const {
      beneficiary_details,
      transfer_amount,
      transfer_id,
      transfer_remarks,
      transfer_mode
    } = req.body;

    
    if (!beneficiary_details || !transfer_amount || !transfer_id || !transfer_mode) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    const { beneficiary_id, beneficiary_name, email, phone, vpa } = beneficiary_details;

    if (!beneficiary_name) {
      return res.status(400).json({ error: 'Beneficiary name is required.' });
    }

    const payload = {
      beneficiary_details: {
        beneficiary_id,
        beneficiary_name,
        email,
        phone,
        vpa
      },
      transfer_amount,
      transfer_id,
      transfer_remarks,
      transfer_mode
    };

    const response = await axios.post(`${BASE_URL}/transfers`, payload, {
      headers: {
        'x-client-id': process.env.CLIENT_ID,
        'x-client-secret': process.env.CLIENT_SECRET,
        'x-api-version': '2024-01-01',
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });


    return res.status(200).json({ message: 'Funds transferred successfully.', data: response.data });

  } catch (error) {

    if (error.response) {
    
      return res.status(error.response.status).json({
        error: error.response.data.message || 'Cashfree API error.',
        details: error.response.data
      });
    } else {
     
      return res.status(500).json({
        error: 'Internal server error.',
        details: error.message
      });
    }
  }
  };
  

module.exports = { addBeneficiary, initiateTransfer }
