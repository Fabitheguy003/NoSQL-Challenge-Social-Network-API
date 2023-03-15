const { Thought } = require('../models');

function getAllThoughts(req, res) {
  Thought.find()
    .populate({ path: 'reactions', select: '-__v' })
    .select('-__v')
    .then((thoughts) => {
      res.json(thoughts);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
}

function getThoughtById(req, res) {
  Thought.findById(req.params.id)
    .populate({ path: 'reactions', select: '-__v' })
    .select('-__v')
    .then((thought) => {
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id' });
      }
      res.json(thought);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
}

function createThought(req, res) {
  Thought.create(req.body)
    .then((thought) => {
      User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      )
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(thought);
        })
        .catch((err) => {
          console.error(err);
          res.status(400).json(err);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
}

function updateThought(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  )
    .then((thought) => {
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id' });
        return;
      }
      res.json(thought);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
}

function deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params.id })
    .then((thought) => {
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id' });
        return;
      }
      User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: req.params.id } }
      )
        .then(() => {
          res.json({ message: 'Successfully deleted the thought' });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
}
  
  function addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        res.json(thought);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  }
  
  function deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { new: true, runValidators: true },
      (err, thought) => {
        if (err) {
          console.error(err);
          res.status(500).json(err);
          return;
        }
        if (!thought) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        res.json({ message: 'Successfully deleted the reaction' });
      }
    );
  }
  
  module.exports = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
  };
  