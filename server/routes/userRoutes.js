const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the API paths
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;