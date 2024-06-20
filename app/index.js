const { startBot } = require('./bot');
const mongoose = require('mongoose');
const Book = require('./model/book');
const Category = require('./model/category');

class Application {
  constructor() {
    this.configApp();
    this.setupMongo();
    // this.insertOneCategory();
    // this.insertOneBook();
    startBot();
  }

  async insertOneBook() {
    const book = new Book({
      name: 'دزیره',
      report: 'page 89',
      meta: [{ key: '15 june', value: 'page 80' }],
      photo:
        'https://dkstatics-public.digikala.com/digikala-products/9257abcf926b66bfdfdcf550fa1e7db82f281628_1595165673.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90',
      cat: ['667413c20c88be99da0af7ae', '666d8aebe9727eaeff6aa024'],
    });
    await book.save();
  }

  async insertOneCategory() {
    const isExist = await Category.findOne({ title: 'تاریخی' });
    if (!isExist) {
      const cat = new Category({
        title: 'تاریخی',
      });
      await cat.save();
    } else console.log('this category is already exist');
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
