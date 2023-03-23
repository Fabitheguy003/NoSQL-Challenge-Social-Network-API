const { Thought, User } = require('../models');

module.exports = {
    // Get all users
    getAllUsers(req, res) {
        User.find()
        .populate({
            path: 'friends',
            select: "-__v",
        })
        .populate({
            path: 'thoughts',
            select: '-__v',
        })
        .select("-__v")
        .then((users) => res.json(users))
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // Get a user
    getUserById(req, res) {
        User.findOne({_id: req.params.id})
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .select('-__v')
            .then((user) => {
                if (!user) {
                    res.status(404).json({
                        message: 'No user with that ID'
                    });
                } else {
                    res.json(user);
                };
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    },
    // Create a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((error) => {
                console.log(error);
                return res.status(500).json(error);
            });
    },
    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((user) => {
            if (!user) {
                res.status(404).json({
                    message: 'No user with that ID'
                });
            } else {
                res.json(user);
            };
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    },
// Delete a user
deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res.status(404).json({
            message: 'No user with that ID',
          });
        } else {
          return Thought.deleteMany({ _id: { $in: user.thoughts } });
        }
      })
      .then((thought) => {
        if (!thought || thought.deletedCount === 0) {
          return res.status(404).json({
            message: 'User deleted successfully, but no thoughts found',
          });
        } else {
          return res.json({
            message: 'User and associated thoughts successfully deleted',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  

    // Add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {runValidatiors: true, new: true},
        )
        .then((user) => {
            if (!user) {
                res.status(400).json({
                    message: 'No user with that ID'
                });
            } else {
                res.json(user);
            };
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    // Delete a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {runValidatiors: true, new: true},
        )
        .then((user) => {
            if (!user) {
                res.status(404).json({
                    message: 'No user with that ID'
                });
            } else {
                res.json(user);
            };
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    },
};