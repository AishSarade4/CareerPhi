const Loan = require('../models/Loan');

// Create Loan Application
const createLoanApplication = async (req, res) => {
    try {
        const loan = new Loan(req.body);
        await loan.save();
        res.status(201).json({ message: 'Your loan application has been submitted successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// View Loan Status
const getLoanStatus = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id);
        if (loan) {
            res.json(loan);
        } else {
            res.status(404).json({ message: 'Loan not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update Loan Status (Admin)
const updateLoanStatus = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id);
        if (loan) {
            loan.status = req.body.status;
            await loan.save();
            res.json({ message: 'Loan status updated successfully' });
        } else {
            res.status(404).json({ message: 'Loan not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createLoanApplication, getLoanStatus, updateLoanStatus };
