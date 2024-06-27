const mongoose = require('mongoose');
const { BookSchema } = require('./book');

const schema = new mongoose.Schema({
  telId: Number,
  fist_name: String,
  username: String,
  fav: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'book',
    },
  ],
  bookStorage: [
    {
      bookId: mongoose.Schema.Types.ObjectId,
      // ref: 'book',
    },
  ],
  buys: [BookSchema],
});

module.exports = mongoose.model('user', schema);
