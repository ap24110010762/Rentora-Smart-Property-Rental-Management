const express = require('express');
const router = express.Router();
const { makePayment, getPayments } = require('../controllers/paymentController');

router.post('/pay', makePayment);
router.get('/all', getPayments);

module.exports = router;