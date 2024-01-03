const { CastError } = require('mongoose').Error;
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
const createCard = async (req, res) => {
  try {
    console.log(req.user._id); // _id станет доступен
    const { name, link } = req.body;
    if (!name || !link) {
      // Если значения полей отсутствуют или равны undefined, выдаем сообщение об ошибке
      return res.status(400).json({ error: 'Неверно заданы поля' });
    }
    const newCard = await CardModel.create(req.body);
    return res.status(201).send(newCard);
  } catch (error) {
    console.error(error); // Вывод ошибки в консоль для дальнейшего анализа
    return res.status(500).send({ message: 'Ошибка сервера' });
  }
};
// УДАЛЕНИЕ КАРТОЧКИ
// eslint-disable-next-line consistent-return
const deleteCardById = async (req, res) => {
  try {
    const { cardId } = req.params;
    // Проверяем, существует ли карточка с указанным идентификатором
    const card = await CardModel.findById(cardId);
    if (!card) {
      return res.status(404).json({ error: 'Карточка не найдена' });
    }
    CardModel.findByIdAndDelete(req.params.cardId)
      .then((delcard) => res.status(200).send(delcard));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка сервера' });
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
