const Maintenance = require('../models/Maintenance');

// 1. GET ALL REQUESTS
exports.getRequests = async (req, res) => {
    try {
        const requests = await Maintenance.find()
            .populate('tenantId', 'name')       // Who reported it?
            .populate('propertyId', 'title landlordId'); // For which house? Who owns it?
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. ADD REQUEST
exports.addRequest = async (req, res) => {
    try {
        const { tenantId, propertyId, issue } = req.body;
        const request = await Maintenance.create({ tenantId, propertyId, issue });
        res.status(201).json(request);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};