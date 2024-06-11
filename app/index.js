const { startBot } = require('./bot');
const mongoose = require('mongoose');

class Application {
  constructor() {
    this.configApp();
    this.setupMongo();
    startBot();
  }

  setupMongo() {
    mongoose
      .connect('mongodb://127.0.0.1:27017')
      .then(() => {
        console.log('db connect');
      })
      .catch((err) => {
        console.log(err);
      });

    async function main() {
      const res = await mongoose.connect('mongodb://127.0.0.1:27017/');

      // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    }
  }

  configApp() {
    require('dotenv').config();
  }
}

module.exports = Application;
