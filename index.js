const dotenv = require('dotenv');
dotenv.config();
//
const {Telegraf} = require("telegraf")
const bot = new Telegraf(process.env.HTTP_KEY)
console.log(process.env.HTTP_KEY);


//ketab khod ra vared konid
// list ketab hay evared shode ra bebinid
// ketab khod ra entekhab konid
// benevisid ta koja in ketab ro khondid
