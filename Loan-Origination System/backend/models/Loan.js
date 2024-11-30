const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    amount: { type: Number, required: true, min: 1 },
    purpose: { type: String, required: true },
    status: { type: String, enum: ['submitted', 'in review', 'approved', 'rejected'], default: 'submitted' }
});

module.exports = mongoose.model('Loan', LoanSchema);
