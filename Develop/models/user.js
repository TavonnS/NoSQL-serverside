const mongoose = require('mongoose');

// create User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
},
{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
}

);

// virtual to count friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;