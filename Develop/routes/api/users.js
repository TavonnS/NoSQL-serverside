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

router.get('/users/:id', getUserById);

router.post('/users', createUser);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

router.post('/users/:userId/friends/:friendId', addFriend);

router.delete('/users/:userId/friends/:friendId', deleteFriend);

module.exports = router;
