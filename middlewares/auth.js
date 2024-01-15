const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');
const ForbiddenError = require('../errors/UnauthorizedError');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.replace('Bearer ', '')
    : null;
  if (!token) {
    return next(new ForbiddenError('Требуется авторизация'));
  }

  try {
    const payload = jwt.verify(token, 'dev_secret');
    req.user = payload;
    next();
  } catch (err) {
    console.error('Auth Middleware: Ошибка при проверке токена', err);
    next(new UnauthorizedError('Неверный токен'));
  }
};

module.exports = auth;
