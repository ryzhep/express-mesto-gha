const express = require('express');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv/config');
const mongoose = require('mongoose');
const appRouter = require('./routes/index');

const app = express();

const { PORT } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(express.json());
// мидлвар, который обоготит объект реквеста полем бади, когда этот бади будет полностью прочитан
// роутер
app.use((req, res, next) => {
  req.user = {
    _id: '65957b01791a4f2e0e926c84',
    // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use(appRouter);

const port = PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
