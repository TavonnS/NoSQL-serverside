const express = require('express');
const router = express.Router();

// Import your route modules
const userRoutes = require('./routes/api/users');
const postRoutes = require('./routes');
const thoughtRoutes = require('./routes');

// Use the route modules
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;