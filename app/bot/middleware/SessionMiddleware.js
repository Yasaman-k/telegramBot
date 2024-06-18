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
      const cat = await Category.findOne({ title: ctx.message.text });
      const book = await Book.find({ cat: cat._id });
      ctx.reply(`you are looking for _${ctx.message.text}_`, { parse_mode: 'Markdown' });
      ctx.reply('these are your books related to this caregory', booksListButtons(book));
    } else {
      next();
    }
  },
};
