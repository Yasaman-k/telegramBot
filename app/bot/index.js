const { Telegraf } = require('telegraf');
// const LocalSession = require('telegraf-session-local');
const { mainButtons } = require('./utils/ButtonManager');
const KeyboardMiddleware = require('./middleware/Keyboardmiddleware');
const { START_MESSAGE } = require('./utils/MessageHandler');

let bot;

const startBot = () => {
  bot = new Telegraf(process.env.BOT_TOKEN);
  bot.launch();
  //  bot.use(new LocalSession({ database: 'session.json' }));
  // bot.use is used for middlewares
  bot.use(KeyboardMiddleware);
  bot.start((ctx) => {
    ctx.reply(START_MESSAGE, mainButtons);
  });

  bot.on();
};

module.exports.startBot = startBot;
