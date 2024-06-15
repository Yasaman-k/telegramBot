const { Telegraf } = require('telegraf');
// const LocalSession = require('telegraf-session-local');
const { mainButtons } = require('./ButtonManager');

let bot;

const startBot = () => {
  bot = new Telegraf(process.env.BOT_TOKEN);
  bot.launch();
  //  bot.use(new LocalSession({ database: 'session.json' }));
  bot.start((ctx) => {
    ctx.reply('hi welcome', mainButtons);
  });
};

module.exports.startBot = startBot;
