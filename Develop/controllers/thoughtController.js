const { Thought } = require('../models/thought');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getThoughtById: async (req, res) => {
    const { thoughtId } = req.params.id;
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
    const { thoughtText, username, userId } = req.body;
    try {
      const thought = await Thought.create({ thoughtText, username });
      userId.thoughts.push(thought._id);
      res.status(201).json(thought);
    } catch (error) {
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
      const thought = await Thought.findByIdAndRemove(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
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
      res.status(500).json(error);
    }
  },

  deleteReaction: async (req, res) => { 
    const { thoughtId, reactionId } = req.params;
    try {
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json({ message: 'Reaction deleted successfully' });
    }
    catch (error) {
      res.status(500).json(error);
    }
}
};

module.exports = thoughtController;
