const { CastError, ValidationError } = require('mongoose').Error;
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const UserModel = require('../models/user');

// ВСЕ ПОЛЬЗОВАТЕЛИ
// eslint-disable-next-line consistent-return
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};
// ПОЛЬЗОВАИТЕЛЬ ПО АЙДИ
const getUserById = (req, res, next) => {
  const { userId } = req.params;

  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя не существует');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};
// СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ
// eslint-disable-next-line consistent-return
const createUser = async (req, res, next) => {
  try {
    const newUser = await UserModel.create(req.body);
    return res.status(201).send(newUser);
  } catch (err) {
    if (err instanceof ValidationError) {
      const errorMessage = Object.values(err.errors)
        .map((error) => error.message)
        .join(', ');
      next(new BadRequestError(`Некорректные данные: ${errorMessage}`));
    } else {
      return res.status(500).send({ message: 'Ошибка сервера' });
    }
  }
};

// ОБНОВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
const updateUser = (req, res, next) => {
  const owner = req.user._id;
  UserModel.findByIdAndUpdate(
    owner,
    { name: req.body.name, about: req.body.about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя не существует');
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

// ОБНОВЛЕНИЕ АВАТАРА ПОЛЬЗОВАТЕЛЯ
const updateUserAvatar = (req, res, next) => {
  const owner = req.user._id;

  UserModel.findByIdAndUpdate(
    owner,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя не существует');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
