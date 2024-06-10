const { Telegraf } = require('telegraf');

let bot;

function startBot() {
  bot = new Telegraf(process.env.BOT_TOKEN);
  bot.launch();
  console.log('pp');
  bot.start((ctx) => {
    ctx.reply('hi');
  });
}

module.exports.startBot = startBot;
