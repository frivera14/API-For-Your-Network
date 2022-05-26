const router = require('express').Router();

const { 
    getThoughts, 
    getSingleThought, 
    createThought, 
    addReaction, 
    updateThought, 
    deleteReaction, 
    deleteThought 
} = require('../../controllers/thought-controller');


router
    .route('/thoughts')
    .get(getThoughts)
    .post(createThought);
router
    .route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);
router 
    .route('/:id/reactions')
    .put(addReaction)
    .put(deleteReaction);

module.exports = router