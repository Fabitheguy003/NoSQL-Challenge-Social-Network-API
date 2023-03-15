const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, trim: true, unique: true },
  email: { type: String, required: true, unique: true, match: [/.+@.+\..+/] },
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

module.exports = model('User', userSchema);
