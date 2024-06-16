const Category = require('../../model/category');
const Book = require('../../model/book');
const { booksListButtons } = require('../utils/ButtonManager');
const { BOOK_LISTـMESSAGE } = require('../utils/MessageHandler');

const actionMap = {
  CAT: /^CAT_\w+/,
  BOOK: /^BOOK_\w+/,
};

module.exports = (ctx, next) => {
  if (!ctx.update.callback_query) return next();
  const callback_data = ctx.update.callback_query.data;
  if (callback_data) {
    const actionValues = Object.values(actionMap);
    for (let i = 0; i < actionValues.length; i++) {
      const isMatch = callback_data.match(actionValues[i]);
      if (isMatch && EventListener[Object.keys(actionMap)[i]]) {
        return EventListener[Object.keys(actionMap)[i]](ctx, isMatch);
      }
    }
  }
  //   if (Object.values(MAIN_BUTTON_TEXT).includes(text) && EventListener[text]) return EventListener[text](ctx);
  // when i call next() func it  continues in project and  run another project
  next();
};

const EventListener = {
  CAT: async (ctx, matches) => {
    const catId = matches[0].split('_')[1];
    const bookListData = await Book.findById(catId);
    // bookListData.filter((item) => item.cat === cat);
    ctx.reply(BOOK_LISTـMESSAGE, booksListButtons(bookListData));
  },
  //   BOOK: async (ctx) => {
  //     const bookListData = await Book.find();
  //     ctx.reply(BOOK_LISTـMESSAGE, booksListButtons(bookListData));
  //   },
};
