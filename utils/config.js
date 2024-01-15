const {
  PORT = 3000,
  DB = 'mongodb://127.0.0.1:27017/mestodb',
  JWT_SECRET = '65957b01791a4f2e0e926c84',
} = process.env;

module.exports = {
  PORT,
  DB,
  JWT_SECRET,
};
