const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Define the API endpoints
router.post('/add', propertyController.addProperty);      // Add
router.get('/all', propertyController.getProperties);     // View All
router.delete('/:id', propertyController.deleteProperty); // Delete 👈 NEW ROUTE

module.exports = router;