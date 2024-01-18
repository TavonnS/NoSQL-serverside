const mongoose = require('mongoose');
const User = require('../models/user');
const Thought = require('../models/thought');
const Reaction = require('../models/reaction');
const { sampleUsers, sampleThoughts, sampleReactions } = require('./data');

mongoose.connect('mongodb://127.0.0.1:27017/NoSQL-appDB');

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();
    // await Reaction.deleteMany();

    // Seed Users
    const createdUsers = await User.insertMany(sampleUsers);

    // Seed Thoughts
    const createdThoughts = await Thought.insertMany(sampleThoughts);

    // Seed Reactions
    // await Reaction.insertMany(
    //   sampleReactions.map((reaction, index) => ({
    //     ...reaction,
    //     thought: createdThoughts[reaction.thoughtIndex]._id,
    //   }))
    // );

    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedData();