const { startBot } = require('./bot');
const mongoose = require('mongoose');
const { insertOneBook } = require('../app/bot/utils/api');

class Application {
  constructor() {
    this.configApp();
    this.setupMongo();
    // this.insertOneCategory();
    // insertOneBook();
    startBot();
  }

  setupMongo() {
    mongoose
      .connect('mongodb://127.0.0.1:27017/book')
      .then(() => {
        console.log('db connect');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  configApp() {
    require('dotenv').config();
  }
}

module.exports = Application;
