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

 // create thought
 createThought({ body }, res) {
    Thought.create(body)
    .then(thought => {
        User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
        )
        .then(thought => {
            if (!thought) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(thought);
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.status(400).json(err));
},

// update thought by id
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.id },
        body,
        { new: true }
    )
    .then(thought => {
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id' });
            return;
        }
        res.json(thought);
    })
    .catch(err => res.status(400).json(err));
},

 //delete thought by id
 deleteThought({ params }, res) {
    // delete the thought
    Thought.findOneAndDelete({ _id: params.id })
    .then(thought => {
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id'});
            return;
        }
        // delete the reference to deleted thought in user's thought array
        User.findOneAndUpdate(
            { username: thought.username },
            { $pull: { thoughts: params.id } }
        )
        .then(() => {
            res.json({message: 'Successfully deleted the thought'});
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
},