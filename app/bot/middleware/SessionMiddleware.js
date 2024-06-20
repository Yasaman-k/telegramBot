const Category = require('../../model/category');
const Book = require('../../model/book');
const { booksListButtons } = require('../utils/ButtonManager');
const { insertOneCategory } = require('../utils/api');

const STATE_LIST = {
  SEARCH: 'search',
  ADDCAT: 'addCat',
};

module.exports = (ctx, next) => {
  const values = Object.values(STATE_LIST);
  //
  // if (!ctx.session.state) return next();
  const state = ctx.session.state;
  if (values.includes(state) && EventListener[state]) {
    return EventListener[state](ctx, next);
  }
  //
  // if (!ctx.session.ADDCAT) return next();
  const addCat = ctx.session.ADDCAT;
  if (values.includes(addCat) && EventListener[addCat]) {
    return EventListener[addCat](ctx, next);
  }
  //
  next();
};

const EventListener = {
  [STATE_LIST.SEARCH]: async (ctx, next) => {
    if (ctx.message) {
      ctx.session.state = undefined;
      const cat = await Category.findOne({ title: ctx.message.text });
      if (cat) {
        const book = await Book.find({ cat: cat._id });
        ctx.reply(`you are looking for _${ctx.message.text}_`, { parse_mode: 'Markdown' });
        ctx.reply('these are your books related to this caregory', booksListButtons(book));
      }
    } else {
      ctx.reply('cant find your category');
      next();
    }
  },
  [STATE_LIST.ADDCAT]: async (ctx, next) => {
    if (ctx.message) {
      ctx.session.ADDCAT = undefined;
      await insertOneCategory(ctx.message.text, ctx);
    }
  },
};
