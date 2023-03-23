const express = require('express');
const router = express.Router();

const thoughtController = require('../../controllers/thoughtController');

router.get('/', thoughtController.getThoughts);
router.get('/:thoughtId', thoughtController.getSingleThought);
router.post('/', thoughtController.createThought);
router.put('/:thoughtId', thoughtController.updateThought);
router.delete('/:thoughtId', thoughtController.deleteThought);
router.post('/:thoughtId/reactions', thoughtController.createReaction);
router.delete('/:thoughtId/reactions/:reactionId', thoughtController.deleteReaction);

module.exports = router;
