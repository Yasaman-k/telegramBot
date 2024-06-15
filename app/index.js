const { startBot } = require('./bot');
const mongoose = require('mongoose');
const Book = require('./model/book');
const Category = require('./model/category');

class Application {
  constructor() {
    this.configApp();
    this.setupMongo();
    // this.insertOneCategory();
    this.insertOneBook();
    startBot();
  }

  async insertOneBook() {
    const book = new Book({
      name: 'the great gatsby',
      report: 'page 89',
      meta: [{ key: '15 june', value: 'page 80' }],
      cat: '666d56bac99373fe72c8a94d',
    });
    await book.save();
  }

  async insertOneCategory() {
    const cat = new Category({
      title: 'tragedy',
    });
    await cat.save();
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
