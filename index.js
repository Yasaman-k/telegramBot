const dotenv = require('dotenv');
dotenv.config();
//
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.HTTP_KEY);
// bot.mention('ysmn_kc', (ctx) => ctx.reply('u menstion someone'));
// bot.on('text', (ctx) => ctx.reply('i love u sara'));

const getUserRole = () => {
  const roles = ['bronze', 'silver', 'gold'];
  const index = Math.floor(Math.random() * roles.length);
  return roles[index];
};

// middleware
bot.use((ctx, next) => {
  ctx.reply('you send a message');
  const role = getUserRole(ctx.message.from);
  ctx.state.role = role;
  next();
});

bot.start((ctx) => {
  ctx.reply(`
    سلام! به خفن ترین ربات دنیا خوش اومدین 
    برای ایجاد کتاب روی /createBook کلیک کنید
    `);
});

bot.command('createBook', (ctx) => {
  ctx.reply('اسم کتاب خود را وارد کنید');
  const role = ctx.state.role;
  ctx.reply(`you ${role}`);
});

bot.launch();

//ketab khod ra vared konid
// list ketab hay evared shode ra bebinid
// ketab khod ra entekhab konid
// benevisid ta koja in ketab ro khondid
