const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  report: String,
  // date: Date,
  meta: [],
});

module.exports = mongoose.model('book', schema);
