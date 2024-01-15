const express = require('express');

const router = express.Router();

const {
  getUserById,
  getUsers,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  userIdValidator,
  userDataValidator,
  userAvatarValidator,
} = require('../middlewares/userValidator');

router.get('/', getUsers);
router.get('/:userId', userIdValidator, getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', userAvatarValidator, updateUserAvatar);
router.get('/me', userDataValidator, getCurrentUser);

module.exports = router;
