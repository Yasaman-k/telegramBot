const Category = require('../../model/category');
const Book = require('../../model/book');
const { booksListButtons } = require('../utils/ButtonManager');
const { insertOneCategory } = require('../utils/api');
const { adminCommentMessage } = require('../utils/MessageHandler');

const STATE_LIST = {
  SEARCH: 'search',
  ADDCAT: 'addCat',
  ADDBOOK: 'addBook',
  COMMENT_TYPE_STATE: 'commentType',
  COMMENT_ENTER: 'commentEnter',
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
    next();
  },
  [STATE_LIST.COMMENT_TYPE_STATE]: async (ctx, next) => {
    ctx.session.state = undefined;
    //update.callback_query  this is the action button
    if (ctx.update.callback_query) {
      const data = ctx.update.callback_query.data;
      ctx.session.state = STATE_LIST.COMMENT_ENTER;
      ctx.session.comment = { commentType: data };
      ctx.reply('موضوع خود را بنوسیسد');
    } else {
      next();
    }
  },
  [STATE_LIST.COMMENT_ENTER]: (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message) {
      const data = ctx.message.text;
      ctx.reply('comment grefte shod');
      ctx.telegram.sendMessage(
        process.env.ADMIN_ID,
        adminCommentMessage({ type: ctx.session.comment.commentType, text: data }, ctx.message.from),
      );
      ctx.session.comment = undefined;
    } else {
      next();
    }
  },
};

module.exports.STATE_LIST = STATE_LIST;
