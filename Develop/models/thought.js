const mongoose = require('mongoose');

// create Thought schema
const thoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [{ 
        
            reactionId: { type: mongoose.Schema.Types.ObjectId, default: () => new Types.ObjectId() },
              
              reactionBody: String,
              username: String,
              createdAt: { type: Date, default: Date.now, get: (createdAtVal) => dateFormat(createdAtVal)},
            }]
});

// virtual to count reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;