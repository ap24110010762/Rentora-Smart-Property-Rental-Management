const Property = require('../models/Property');

// 1. GET ALL PROPERTIES
exports.getProperties = async (req, res) => {
    try {
        // .populate('landlordId', 'name') pulls the Landlord's name from the Users collection
        const properties = await Property.find().populate('landlordId', 'name');
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. ADD PROPERTY
exports.addProperty = async (req, res) => {
    try {
        const { title, location, rentAmount, landlordId } = req.body;
        const newProperty = await Property.create({ title, location, rentAmount, landlordId });
        res.status(201).json(newProperty);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. DELETE PROPERTY
exports.deleteProperty = async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};