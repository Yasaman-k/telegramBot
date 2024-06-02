const dotenv = require('dotenv');
dotenv.config();
//
const {Telegraf} = require("telegraf")
const bot = new Telegraf(process.env.HTTP_KEY)
bot.start(ctx => {
    console.log(ctx);
    ctx.reply(`
    سلام! به خفن ترین ربات دنیا خوش اومدین 
    برای ایجاد کتاب روی /createBook کلیک کنید
    `)
})
bot.command("createBook",ctx=>{
ctx.reply("اسم کتاب خود را وارد کنید")
})
bot.launch()


//ketab khod ra vared konid
// list ketab hay evared shode ra bebinid
// ketab khod ra entekhab konid
// benevisid ta koja in ketab ro khondid
