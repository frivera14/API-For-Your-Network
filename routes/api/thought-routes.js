const router = require('express').Router();

const { 
    getThoughts, 
    getSingleThought, 
    createThought, 
    addReaction, 
    updateThought, 
    deleteReaction, 
    deleteThought,
    deleteThoughts 
} = require('../../controllers/thought-controller');


router
    .route('/')
    .get(getThoughts)
    .post(createThought)
    .delete(deleteThoughts)
router
    .route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);
router 
    .route('/:id/reactions')
    .post(addReaction)
    .delete(deleteReaction);

module.exports = router