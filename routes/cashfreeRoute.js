const express = require('express');
const { addBeneficiary, initiateTransfer } = require('../controllers/cashfreeController');

const router = express.Router();

router.post('/add-beneficiary', addBeneficiary); // Route to add a beneficiary
router.post('/make-payout', initiateTransfer);         // Route to make a payout

module.exports = router;
