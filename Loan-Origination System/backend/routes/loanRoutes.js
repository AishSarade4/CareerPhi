const express = require('express');
const router = express.Router();
const { createLoanApplication, getLoanStatus, updateLoanStatus } = require('../controllers/loanController');

// Route to submit loan application
router.post('/apply', createLoanApplication);

// Route to get loan status
router.get('/:id', getLoanStatus);

// Route for admin to update loan status
router.patch('/:id', updateLoanStatus);

module.exports = router;
