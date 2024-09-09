const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Path to your routes file

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Body parser

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    dbName: 'test' // Specify the 'test' database
})
.then(() => console.log('MongoDB Connected to test database'))
.catch((err) => console.error('MongoDB connection error:', err));

// Use auth routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
