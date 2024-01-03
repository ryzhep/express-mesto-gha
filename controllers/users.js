const { CastError } = require('mongoose').Error;
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
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId).orFail(
      () => new Error('NotFoundError'),
    );
    return res.status(200).send(user);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return res.status(404).send({ message: 'Нет такого пользователя' });
    }
    if (error.message === 'CastError') {
      return res.status(400).send({ message: 'Невалидный поиск' });
    }
    return res.status(500).send({ message: 'Ошибка сервера' });
  }
};
// СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ
const createUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(500).send({ message: 'Ошибка сервера' });
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
// ОБНОВЛЕНИЕ АВАТАРА ПОЛЬЗОВАТЕЛЯ
const updateUserAvatar = (req, res, next) => {
  const owner = req.user._id;

  UserModel.findByIdAndUpdate(
    owner,
    { avatar: req.body.avatar },
    {
      new: true,
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
