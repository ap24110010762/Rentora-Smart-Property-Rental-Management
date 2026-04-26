const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import the Routes
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes'); 
const maintenanceRoutes = require('./routes/maintenanceRoutes'); 
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();
connectDB(); // Connects to MongoDB Atlas

const app = express();

// Middlework
app.use(cors()); 
app.use(express.json());

// Main API Endpoints
app.use('/api/users', userRoutes);         // For Register & Login
app.use('/api/properties', propertyRoutes); // For Adding & Viewing Houses
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
    res.send('Property Rental API is Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});