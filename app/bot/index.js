const { Telegraf } = require('telegraf');

let bot;

const startBot = () => {
  bot = new Telegraf(process.env.BOT_TOKEN);
  bot.launch();
  bot.start((ctx) => {
    ctx.reply('hi');
  });
};

module.exports.startBot = startBot;
