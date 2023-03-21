const mongoose = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
  createdAt: { type: Date, default: Date.now, get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') },
  username: { type: String, required: true },
  reactions: [reactionSchema]
}, { toJSON: { virtuals: true }, id: false });

// retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

module.exports = mongoose.model('Thought', thoughtSchema);
