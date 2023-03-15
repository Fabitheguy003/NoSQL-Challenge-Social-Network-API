const { Thought } = require('../models');

module.exports = {
// GET /api/thoughts
async getAllThoughts(req, res) {
try {
const thoughts = await Thought.find()
.populate({ path: 'reactions', select: '-__v' })
.select('-__v');
res.json(thoughts);
} catch (err) {
console.error(err);
res.status(500).json(err);
}
},

// GET /api/thoughts/:id
async getThoughtById(req, res) {
try {
const thought = await Thought.findById(req.params.id)
.populate({ path: 'reactions', select: '-__v' })
.select('-__v');
if (!thought) {
return res.status(404).json({ message: 'No thought found with this id' });
}
res.json(thought);
} catch (err) {
console.error(err);
res.status(400).json(err);
}
},
};