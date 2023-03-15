const { User, Course, Student } = require('../models');

module.exports = {
// Get all users
getUsers(req, res) {
User.find()
.then((users) => res.json(users))
.catch((err) => res.status(500).json(err));
},

// Get a user by id
getUserById(req, res) {
User.findOne({ _id: req.params.id })
.populate({
path: 'thoughts',
select: '-__v'
})
.populate({
path: 'friends',
select: '-__v'
})
.select('-__v')
.then((user) => {
if (!user) {
res.status(404).json({ message: 'No user found with this id!' });
} else {
res.json(user);
}
})
.catch((err) => {
console.log(err);
res.status(400).json(err);
});
},

// Create a new user
createUser(req, res) {
User.create(req.body)
.then((user) => res.json(user))
.catch((err) => {
console.log(err);
return res.status(500).json(err);
});
},

// Delete a user
deleteUser(req, res) {
User.findOneAndDelete({ _id: req.params.userId })
.then((user) => {
if (!user) {
res.status(404).json({ message: 'No user with that ID' });
} else {
return Student.deleteMany({ _id: { $in: user.students } });
}
})
.then(() => res.json({ message: 'User is deleted!' }))
.catch((err) => res.status(500).json(err));
},

// Update a user
updateUser(req, res) {
User.findOneAndUpdate(
{ _id: req.params.userId },
{ $set: req.body },
{ runValidators: true, new: true }
)
.then((user) => {
if (!user) {
res.status(404).json({ message: 'No user with this id!' });
} else {
res.json(user);
}
})
.catch((err) => res.status(500).json(err));
},

// Add a friend
addFriend(req, res) {
User.findOneAndUpdate(
{ _id: req.params.userId },
{ $addToSet: { friends: req.params.friendId } },
{ runValidators: true, new: true }
)
.then((user) => {
if (!user) {
res.status(400).json({ message: 'No user with that ID' });
} else {
res.json(user);
}
})
.catch((error) => {
console.log(error);
res.status(500).json(error);
});
},

// Delete a friend
deleteFriend(req, res) {
User.findOneAndUpdate(
{ _id: req.params.userId },
{ $pull: { friends: req.params.friendId } },
{ runValidators: true, new: true }
)
.then((user) => {
if (!user) {
res.status(404).json({ message: 'No user with that ID' });
} else {
res.json(user);
}
})
.catch((error) => {
console.log(error);
res.status(500).json(error);
});
},
};