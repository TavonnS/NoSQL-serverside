const User = require('../models/user');
const mongoose = require('mongoose');
const Thought = require('../models/thought');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getUserById: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createUser: async (req, res) => {
    const { username, email } = req.body;
    try {
      const user = await User.create({ username, email });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateUser: async (req, res) => {
    const { userId } = req.params;
    const { username, email } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;
    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete associated thoughts
        await Thought.deleteMany({ _id: { $in: user.thoughts } });

        // Delete the user
        await User.findByIdAndDelete(userId);

        res.json({ message: 'User and associated thoughts deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
},

  addFriend: async (req, res) => {
    const { userId } = req.params;
    const { friendId } = req.params;
    try {
      // Assuming user is fetched from the database using userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.friends.includes(friendId)) {
        return res.status(400).json({ message: 'Friend already added' });
      }
  
      user.friends.push(friendId);
      await user.save();
  
      res.status(200).json({ message: 'Friend added successfully', user });
  
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
  
  deleteFriend: async (req, res) => {
    const { userId, friendId } = req.params;

    try {
        // Check if friendId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(friendId)) {
            return res.status(400).json({ message: 'Invalid friendId' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Friend deleted successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
},

}; 

module.exports = userController;
