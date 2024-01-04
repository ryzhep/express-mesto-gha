const { CastError, ValidationError } = require('mongoose').Error;
const CardModel = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

// ВСЕ КАРТОЧКИ
const getCards = (req, res, next) => {
  CardModel.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// СОЗДАНИЕ КАРТОЧКИ
const createCard = async (req, res, next) => {
  console.log(req.user._id); // _id станет доступен
  const { name, link } = req.body;
  const { _id: userId } = req.user;
  CardModel.create({ name, link, owner: userId })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err instanceof ValidationError) {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(' ');
        next(new BadRequestError(`Некорректные данные: ${errorMessage}`));
      } else {
        next(err);
      }
    });
};
// УДАЛЕНИЕ КАРТОЧКИ
// eslint-disable-next-line consistent-return
const deleteCardById = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    // Проверяем, существует ли карточка с указанным идентификатором
    const card = await CardModel.findById(cardId);
    if (!card) {
      throw new NotFoundError('Такой карточки не существует');
    }
    CardModel.findByIdAndDelete(req.params.cardId)
      .then((delcard) => res.status(200).send(delcard));
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError('Некорректный id карточки'));
    } else {
      next(err);
    }
  }
};

// ПОСТАВИТЬ ЛАЙК
const likeCard = (req, res, next) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        return next(new BadRequestError('Некорректный id карточки'));
      }
      return next(err);
    });
};
// УБРАТЬ ЛАЙК
const dislikeCard = (req, res, next) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,

    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        return next(new BadRequestError('Некорректный id карточки'));
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
