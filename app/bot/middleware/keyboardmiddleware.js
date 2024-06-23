const { MAIN_BUTTON_TEXT } = require('../utils/ButtonManager');
const Category = require('../../model/category');
const { categoryList: categoriesListButtons } = require('../utils/ButtonManager');
const { CATEGORY_LIST_MESSAGE, WRITE_CATEGORY_MESSAGE, WRITE_BOOK_MESSAGE } = require('../utils/MessageHandler');

module.exports = (ctx, next) => {
  if (!ctx.message) return next();
  const text = ctx.message.text;
  if (text)
    if (Object.values(MAIN_BUTTON_TEXT).includes(text) && EventListener[text]) {
      return EventListener[text](ctx);
    }
  // when i call next() func it  continues in project and  run another project
  next();
};

const EventListener = {
  [MAIN_BUTTON_TEXT.VIEW]: async (ctx) => {
    const categoryListData = await Category.find();
    ctx.reply(CATEGORY_LIST_MESSAGE, categoriesListButtons(categoryListData));
  },
  [MAIN_BUTTON_TEXT.CREATECat]: (ctx) => {
    ctx.session.ADDCAT = 'addCat';
    ctx.reply(WRITE_CATEGORY_MESSAGE);
  },
  [MAIN_BUTTON_TEXT.CREATEBook]: (ctx) => {
    ctx.reply(WRITE_BOOK_MESSAGE);
  },
};

module.exports.KeyboardEventListener = EventListener;
