const Payment = require('../models/Payment');

// 1. GET ALL PAYMENTS
exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('tenantId', 'name') // The Tenant
            .populate({
                path: 'propertyId',
                populate: { path: 'landlordId', select: 'name' } // The Landlord (nested link)
            });
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. MAKE PAYMENT
exports.makePayment = async (req, res) => {
    try {
        const { tenantId, propertyId, amount } = req.body;
        const payment = await Payment.create({ tenantId, propertyId, amount });
        res.status(201).json(payment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};