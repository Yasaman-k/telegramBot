const { Telegraf } = require('telegraf');
// const LocalSession = require('telegraf-session-local');
const { mainButtons } = require('./ButtonManager');
const KeyboardMiddleware = require('./middleware/keyboardmiddleware');

let bot;

const startBot = () => {
  bot = new Telegraf(process.env.BOT_TOKEN);
  bot.launch();
  //  bot.use(new LocalSession({ database: 'session.json' }));
  // bot.use is used for middlewares
  bot.use(KeyboardMiddleware);
  bot.start((ctx) => {
    ctx.reply('hi welcome', mainButtons);
  });

  bot.on();
};

module.exports.startBot = startBot;
