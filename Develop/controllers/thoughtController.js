const mongoose = require('mongoose');
const Thought = require('../models/thought');
const User = require('../models/user');



const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  getThoughtById: async (req, res) => {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createThought: async (req, res) => {
    const { thoughtText, username } = req.body;
    try {
        // Create the thought with auto-generated _id
        const thought = await Thought.create({ thoughtText, username });

        // Find the user by username and update the thoughts array
        const user = await User.findOneAndUpdate(
            { username },
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        if (!user) {
            // If user is not found, handle accordingly
            return res.status(404).json({ error: 'User not found' });
        }

        // Send the created thought as a response
        res.status(201).json(thought);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
},


  updateThought: async (req, res) => {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;
    try {
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { thoughtText },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteThought: async (req, res) => {
    const { thoughtId } = req.params;

    try {
        const deletedThought = await Thought.findByIdAndDelete(thoughtId);

        if (!deletedThought) {
            return res.status(404).json({ error: 'Thought not found' });
        }

        res.json({ message: 'Thought deleted successfully' });
      
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
},


  createReaction: async (req, res) => {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    try {
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        {
          $push: { reactions: { reactionBody, username } },
        },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  deleteReaction: async (req, res) => { 
    const { thoughtId, reactionId } = req.params;

    try {
        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { _id: reactionId } } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({ error: 'Thought not found' });
        }

        res.json({ message: 'Reaction deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}


};

module.exports = thoughtController;
