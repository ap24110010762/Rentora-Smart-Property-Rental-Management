const express = require('express');
const router = express.Router();
const { addRequest, getRequests } = require('../controllers/maintenanceController');

router.post('/add', addRequest);
router.get('/all', getRequests);

module.exports = router;