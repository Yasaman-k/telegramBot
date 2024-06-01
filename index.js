const dotenv = require('dotenv');
dotenv.config();
//
const {Telegraf} = require("telegraf")
const bot = new Telegraf(process.env.HTTP_KEY)
bot.start(ctx => ctx.reply("سلام! به خفن ترین ربات دنیا خوش اومدین! این ربات برای اینه که بتونید لیست کتاب هایی که در حال خوندن هستید رو ذخیره کنید و اخر هر روز باید اینجا وارد کنید ک چقدر از کتاب هایی ک وارد کردید رو خوندید "))

bot.launch()


//ketab khod ra vared konid
// list ketab hay evared shode ra bebinid
// ketab khod ra entekhab konid
// benevisid ta koja in ketab ro khondid
