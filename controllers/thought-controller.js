const { Thought, User } = require('../models');

const thoughtController = {

    getThoughts(req, res){
        Thought.find({})
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(400).json(err));
    },

    
}