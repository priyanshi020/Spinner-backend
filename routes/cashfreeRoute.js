const express = require('express');
const { addBeneficiary, initiateTransfer } = require('../controllers/cashfreeController');

const router = express.Router();

router.post('/add-beneficiary', addBeneficiary); 
router.post('/make-payout', initiateTransfer);        

module.exports = router;
