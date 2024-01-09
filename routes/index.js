const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', usersRouter); // роутеры для пользователей
router.use('/cards', cardsRouter); // роутеры для карточек

// роут для запросов по несуществующим URL

router.use('*', (req, res, next) => {
  next(
    new NotFoundError(
      'Страница не найдена. Проверьте правильность ввода URL и метод запроса',
    ),
  );
});

module.exports = router;
