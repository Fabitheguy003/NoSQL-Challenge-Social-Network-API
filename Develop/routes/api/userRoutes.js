const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');

router.get('/api/users', userController.getUsers);
router.post('/api/users', userController.createUser);
router.get('/api/users/:id', userController.getUserById);
router.put('/api/users/:id', userController.updateUser);
router.delete('/api/users/:id', userController.deleteUser);
router.post('/api/users/:userId/friends/:friendId', userController.addFriend);
router.delete('/api/users/:userId/friends/:friendId', userController.deleteFriend);

module.exports = router;
