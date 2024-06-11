const { startBot } = require('./bot');
const mongoose = require('mongoose');
const uri = 'mongodb+srv://jasmine:ReVlyYsWaWbaSuum@cluster0.j9u8vmg.mongodb.net/';
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

class Application {
  constructor() {
    this.configApp();
    this.setupMongo();
    startBot();
  }

  setupMongo() {
    async function run() {
      try {
        console.log('um');
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log('Pinged your deployment. You successfully connected to MongoDB!');
      } finally {
        // Ensures that the client will close when you finish/error
        await mongoose.disconnect();
      }
    }
    run().catch(console.dir);
    // mongoose
    //   .connect(uri, clientOptions)
    //   .then(() => {
    //     console.log('db connect');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // async function main() {
    //   const res = await mongoose.connect('mongodb://127.0.0.1:27017/');

    //   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    // }
  }

  configApp() {
    require('dotenv').config();
  }
}

module.exports = Application;
