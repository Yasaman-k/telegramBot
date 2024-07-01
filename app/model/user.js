const mongoose = require('mongoose');
const { BookSchema } = require('./book');

const schema = new mongoose.Schema({
  telId: Number,
  first_name: String,
  username: String,
  fav: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'book',
    },
  ],
  bookStorage: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
      },
      shareUse: Boolean,
    },
  ],
  buys: [BookSchema],
});

const User = mongoose.model('user', schema);
module.exports = User;
module.exports.createUser = async (userTel, saveUser = true) => {
  const user = new User({
    telId: userTel.id,
    first_name: userTel.first_name,
    username: userTel.username,
  });
  if (saveUser) {
    await user.save();
  }
  return user;
};
