const express = require('express');

const router = express.Router();

const {
  getUserById,
  getUsers,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);
router.get('/me', getCurrentUser);

module.exports = router;
