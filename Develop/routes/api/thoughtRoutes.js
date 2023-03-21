const express = require('express');
const router = express.Router();

const thoughtController = require('../../controllers/thoughtController');

router.get('/api/thoughts', thoughtController.getThoughts);
router.get('/api/thoughts/:thoughtId', thoughtController.getSingleThought);
router.post('/api/thoughts', thoughtController.createThought);
router.put('/api/thoughts/:thoughtId', thoughtController.updateThought);
router.delete('/api/thoughts/:thoughtId', thoughtController.deleteThought);
router.post('/api/thoughts/:thoughtId/reactions', thoughtController.createReaction);
router.delete('/api/thoughts/:thoughtId/reactions/:reactionId', thoughtController.deleteReaction);

module.exports = router;
