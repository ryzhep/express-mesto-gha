const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter); // роутеры для пользователей
router.use('/cards', cardsRouter); // роутеры для карточек
module.exports = router;
