const { User } = require('../models');

const userController = {

    getAllUsers(req, res) {
        User.find({})
        .populate({ path: 'friends', select: '-__v'})
        .populate({ path: 'thoughts', select: '-__v'})
        .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err))
    },

    getSingleUser({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends'
            })
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err))
    },

    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err))
    },

    addFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.id},
            { $push: { friends: params.friendId  }},
            { new: true, runValidators: true }
            )
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No users found'})
                }
                res.json(userData)
            })
            .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id' })
                }
                res.json(userData)
            })
            .catch(err => res.status(400).json(err));
    },

    deleteFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $pull: {friends: params.friendId}},
            { new: true, runValidators: true }
            )
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },

    deleteAll(req, res) {
        User.deleteMany({})
        .then(userData => res.json(userData))
        .catch(err => res.json(err))
    }



}

module.exports = userController;