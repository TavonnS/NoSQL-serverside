const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);


// Import your route modules
const userRoutes = require('./api/users');
const thoughtRoutes = require('./api/thoughts');

// Use the route modules
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;