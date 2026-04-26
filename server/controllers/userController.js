const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER LOGIC (Signup)
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        // Bcrypt: Hash the password before saving (security)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in Database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: "User registered successfully!", user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. LOGIN LOGIC (Authentication)
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Bcrypt: Compare the typed password with the hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // JWT: Create a token (This allows the user to stay logged in)
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({ 
            message: "Login successful!", 
            token, 
            user: { id: user._id, name: user.name, role: user.role } 
        });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};