const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  report: String,
  // date: Date,
  photo: String,
  meta: [],
  cat: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
    },
  ],
});

module.exports = mongoose.model('book', schema);
module.exports.BookSchema = schema;
