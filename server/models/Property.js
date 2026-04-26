const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    rentAmount: { type: Number, required: true },
    landlordId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Available', 'Occupied'], 
        default: 'Available' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);