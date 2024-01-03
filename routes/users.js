const express = require("express");
const router = express.Router();

const { createUser, getUserById, getUsers, updateUser, updateUserAvatar } = require("../controllers/users");
router.get("/", getUsers);
router.get('/:userId', getUserById);
router.post("/", createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
