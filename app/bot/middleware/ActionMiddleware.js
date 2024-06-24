const Book = require('../../model/book');
const { booksListButtons, MAIN_BUTTON_TEXT, commentsButtons } = require('../utils/ButtonManager');
const { BOOK_LISTـMESSAGE, WRITE_CATEGORY_MESSAGE } = require('../utils/MessageHandler');
const { KeyboardEventListener } = require('./Keyboardmiddleware');
const { STATE_LIST } = require('./SessionMiddleware');

const actionMap = {
  CAT: /^CAT_\w+/,
  BOOK: /^BOOK_\w+/,
  BACK: /^BACK_\w+/,
  SEARCH: /^SEARCH/,
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
    const bookListData = await Book.find({ cat: catId });
    ctx.reply(BOOK_LISTـMESSAGE, booksListButtons(bookListData));
  },
  BOOK: async (ctx, matches) => {
    const bookId = matches[0].split('_')[1];
    const selectedBook = await Book.findById({ _id: bookId });
    if (selectedBook) {
      // ctx.reply(BOOK_REPORT_MESSAGE);
      //  ctx.replyWithPhoto({ source: 'public/gatsby.jpeg' }, { caption: 'the great gatsby' });
      // ctx.replyWithPhoto({
      //   url: 'https://dkstatics-public.digikala.com/digikala-products/9257abcf926b66bfdfdcf550fa1e7db82f281628_1595165673.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90',
      // });
      if (selectedBook.photo) {
        await ctx.telegram.sendChatAction(ctx.chat.id, 'upload_photo');
        await ctx.replyWithPhoto(selectedBook.photo, commentsButtons);
      } else {
        console.log('another photo');
      }
      // await ctx.replyWithPhoto('AgACAgQAAxkBAAIDXGZ0ItuVib4DRXwWAaV7hNPAejHIAAJxwjEbqAABoFMUcH22TuPhVAEAAwIAA20AAzUE');
    } else {
      ctx.reply('book not found');
    }
    return;
  },
  BACK: (ctx, matches) => {
    const where = matches[0].split('_')[1];
    switch (where) {
      case 'CAT':
        KeyboardEventListener[MAIN_BUTTON_TEXT.VIEW](ctx);
        break;
      // case 'BOOK':
      //   const cat = matches[0].split('_')[2];
      //   EventListener.CAT(ctx, [`CAT_${cat}`]);
      //   break;
    }
  },
  SEARCH: (ctx) => {
    // session.state is arbitary anything you want to write
    ctx.session.state = STATE_LIST.SEARCH;
    ctx.reply(WRITE_CATEGORY_MESSAGE);
  },
};
