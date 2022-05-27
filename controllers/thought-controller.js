const { Thought, User } = require('../models');

const thoughtController = {

    getThoughts(req, res) {
        Thought.find({})
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(400).json(err));
    },

    getSingleThought({ params }, res) {
        Thought.findOne({ _id: params.id})
        .populate({
            path: 'username'
        })
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(400).json(err))
    },

    createThought({params, body}, res) {
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    { _id: params.body.userId },
                    { $push: { thoughts: _id }},
                    { new: true, runValidators: true }
                )
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id!'})
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json(thoughtData)
            }
            res.json(thoughtData)
        })
        .catch(err => res.json(err))
    },

    updateThought({params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.id}, body, { new: true })
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: 'No thought found with that id.'})
                }
                res.json(thoughtData)
            })
            .catch(err => res.status(400).json(err))
    },

    deleteReaction({ params }, res) {
        Thought.findByIdAndUpdate(
            {_id: params.thoughtId},
            { $pull: { reactions: { reactionId: params.reactionId}}},
            { new: true, runValidators: true }
            )
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err))
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({_id: params.id}) 
            .then(deletedThought => {
                if(!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with this id'})
                }
                return User.findOneAndUpdate(
                        {_id: params.userId},
                        { $pull: {thoughts: params.thoughtId}},
                        { new: true }
                )
            })
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(400).json(err))
    },

    deleteThoughts({req, res}) {
        Thought.deleteMany({})
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(400).json(err))
    }
}

module.exports = thoughtController;