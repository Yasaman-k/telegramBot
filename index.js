const dotenv = require('dotenv');
dotenv.config();
//
const { startMessage } = require('./messageHandler');
const symbolList = require('./data');
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
// bot.mention('ysmn_kc', (ctx) => ctx.reply('u menstion someone'));
// bot.on('text', (ctx) => ctx.reply('i love u sara'));

bot.start((ctx) => {
  ctx.reply(startMessage());
});

// bot.on('text', (ctx) => {
//   const text = ctx.message.text;
//   const refactorData = symbolList.reduce((acc, item) => {
//     return { ...acc, [item.bookName]: item };
//   }, {});
//   console.log(refactorData);
// });

const getUserRole = () => {
  const roles = ['bronze', 'silver', 'gold'];
  const index = Math.floor(Math.random() * roles.length);
  return roles[index];
};

// middleware
// bot.use((ctx, next) => {
//   ctx.reply(
//     'you send a message',
//     (1,
//     'ss',
//     {
//       reply_markup: {
//         keyboard: [
//           [
//             {
//               text: 'one button',
//             },
//           ],
//           [
//             {
//               text: 'one button',
//             },
//             {
//               text: 'one button',
//             },
//           ],
//         ],
//       },
//     }),
//   );
//   //   ctx.telegram.sendMessage(ctx.message.chat.id, 'پیام', {
//   //     reply_markup: {
//   //       inline_keyboard: [
//   //         [
//   //           {
//   //             text: 'one button',
//   //             callback_data: 'buttonClick',
//   //           },
//   //         ],
//   //       ],
//   //     },
//   //   });

//   const role = getUserRole(ctx.message.from);
//   ctx.state.role = role;
//   next();
// });

bot.on('text', (ctx) => {
  ctx.reply('پیام', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'یه دکمه',
            callback_data: 'buttonClick',
          },
        ],
      ],
    },
  });
});

bot.command('createBook', (ctx) => {
  ctx.reply('اسم کتاب خود را وارد کنید');
  const role = ctx.state.role;
  ctx.reply(`you ${role}`);
  console.log('new mess');
});

bot.command('bookList', (ctx) => {
  ctx.reply('اسم کتاب خود را وارد کنید');
});

bot.action('buttonClick', (ctx) => {
  ctx.reply('we got your mesage base on clik');
});

bot.hears('/.mahsol./', (ctx) => {
  ctx.reply('mahsoaltt');
});

bot.launch();

//ketab khod ra vared konid
// list ketab hay evared shode ra bebinid
// ketab khod ra entekhab konid
// benevisid ta koja in ketab ro khondid
