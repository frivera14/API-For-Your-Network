const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    addFriend,
    updateUser,
    deleteFriend,
    deleteUser,
    deleteAll
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)
    .delete(deleteAll)

router
    .route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:id/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend)


module.exports = router
