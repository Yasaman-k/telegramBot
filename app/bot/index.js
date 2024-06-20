const { Telegraf } = require('telegraf');
const { mainButtons } = require('./utils/ButtonManager');
const KeyboardMiddleware = require('./middleware/Keyboardmiddleware');
const ActionMiddleware = require('./middleware/ActionMiddleware');
const SessionMiddleware = require('./middleware/SessionMiddleware');
const LocalSession = require('telegraf-session-local');
const { START_MESSAGE } = require('./utils/MessageHandler');

let bot;

const startBot = () => {
  bot = new Telegraf(process.env.BOT_TOKEN);
  bot.launch();
  bot.use(new LocalSession({ database: 'session.json' }));
  bot.use(KeyboardMiddleware);
  bot.use(SessionMiddleware);
  bot.use(ActionMiddleware);
  bot.start((ctx) => {
    ctx.reply(START_MESSAGE, mainButtons);
  });

  bot.on();
};

module.exports.startBot = startBot;
