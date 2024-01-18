const express = require('express');
const router = express.Router();


const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

router.get('/', getAllUsers);

router.get('/:userId', getUserById);

router.post('/', createUser);

router.put('/:userId', updateUser);

router.delete('/:userId', deleteUser);

router.post('/:userId/friends/:friendId', addFriend);

router.delete('/:userId/friends/:friendId', deleteFriend);

module.exports = router;
