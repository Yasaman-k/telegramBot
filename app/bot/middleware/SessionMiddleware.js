const Category = require('../../model/category');
const Book = require('../../model/book');
const { booksListButtons, MAIN_BUTTON_TEXT } = require('../utils/ButtonManager');
const { BOOK_LISTـMESSAGE, BOOK_REPORT_MESSAGE } = require('../utils/MessageHandler');
const { KeyboardEventListener } = require('./Keyboardmiddleware');

const STATE_LIST = {
  SEARCH: 'search',
};

module.exports = (ctx, next) => {
  if (!ctx.session.state) return next();
  const state = ctx.session.state;
  const values = Object.values(STATE_LIST);
  if (values.includes(state) && EventListener[state]) {
    return EventListener[state](ctx, next);
  }
  next();
};

const EventListener = {
  [STATE_LIST.SEARCH]: async (ctx, next) => {
    if (ctx.message) {
      ctx.session.state = undefined;
      //   console.log(ctx.message);
      //   const cat = await Category.find({ title: ctx.message.text });
      //   console.log(cat, 'ss');
      //   console.log();
      ctx.reply(`you are looking for _${ctx.message.text}_`, { parse_mode: 'Markdown' });
    } else {
      next();
    }
  },
};
