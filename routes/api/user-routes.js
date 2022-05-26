const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    addFriend,
    updateUser,
    deleteFriend,
    deleteUser 
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .router('/:id/friends/:friendId')
    .put(addFriend)
    .put(deleteFriend)


module.exports = router
