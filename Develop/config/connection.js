const mongoose = require('mongoose');

const connectDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-api';
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

};

module.exports = connectDB;