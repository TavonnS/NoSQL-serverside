const express = require('express');
const router = express.Router();
const thoughtController = require('../controllers/thoughtController');

// Define your thought routes here

// Get all thoughts
router.get('/', thoughtController.getAllThoughts);

// Get thought by ID
router.get('/:thoughtId', thoughtController.getThoughtById);

// Create a new thought
router.post('/', thoughtController.createThought);

// Update thought by ID
router.put('/:thoughtId', thoughtController.updateThought);

// Delete thought by ID
router.delete('/:thoughtId', thoughtController.deleteThought);

module.exports = router;
