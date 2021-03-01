const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
 name: String,
  email: String,
  password: String,
  phone: Array,
  dateofbirth: String,
  address: Array,
  cart: Array,
  history: Array,
  cards: Array,
  profileImg: String
});

module.exports = mongoose.model('user', userSchema, "Users");