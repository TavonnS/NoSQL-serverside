// index.js or app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connection');
const app = express();

// Middleware to parse JSON in request body
app.use(express.json());

// Middleware to allow cross-origin requests
app.use(cors());

// MongoDB connection
connectDB();

// Include the routes
const userRoutes = require('./routes/index');
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});