const { session } = require('telegraf');
const Book = require('../../model/book');
const User = require('../../model/user');
const { booksListButtons, MAIN_BUTTON_TEXT, bookDetailButtons, sharedUseButtons } = require('../utils/ButtonManager');
const { BOOK_LISTـMESSAGE, WRITE_CATEGORY_MESSAGE } = require('../utils/MessageHandler');
const { KeyboardEventListener } = require('./Keyboardmiddleware');
const { STATE_LIST } = require('./SessionMiddleware');

const actionMap = {
  CAT: /^CAT_\w+/,
  BOOK: /^BOOK_\w+/,
  BACK: /^BACK_\w+/,
  SEARCH: /^SEARCH/,
  FAV: /^FAV_\w+/,
  CART: /^CART_\w+/,
  SHARED_USE: /^SHARED_USE_\w+/,
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
    const userTel = ctx.update.callback_query.from.id;
    let user = await User.findOne({ telId: userTel.id });

    if (selectedBook) {
      const existInFav = user?.fav?.includes(bookId);
      //  ctx.replyWithPhoto({ source: 'public/gatsby.jpeg' }, { caption: 'the great gatsby' });
      // ctx.replyWithPhoto({
      //   url: 'https://dkstatics-public.digikala.com/digikala-products/9257abcf926b66bfdfdcf550fa1e7db82f281628_1595165673.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90',
      // });
      if (selectedBook.photo) {
        await ctx.telegram.sendChatAction(ctx.chat.id, 'upload_photo');
        await ctx.replyWithPhoto(selectedBook.photo, bookDetailButtons(selectedBook, 'caption', existInFav));
      } else {
        console.log('default photo');
      }
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
  FAV: async (ctx, matches) => {
    const bookId = matches[0].split('_')[1];
    const userTel = ctx.update.callback_query.from;
    let user = await User.findOne({ telId: userTel.id });
    if (!user) {
      user = new User({
        telId: userTel.id,
        first_name: userTel.first_name,
        username: userTel.username,
        fav: [bookId],
      });
    } else if (!user.fav.includes(bookId)) {
      user.fav.push(bookId);
    } else user.fav = user.fav.filter((item) => item != bookId);
    await user.save();
    ctx.telegram.editMessageReplyMarkup(
      ctx.update.callback_query.message.chat.id,
      ctx.update.callback_query.message.message_id,
      undefined,
      bookDetailButtons({ _id: bookId }, '', user.fav.includes(bookId)).reply_markup,
    );
    ctx.reply('عملیات موفقیت امیز بود');
  },
  CART: (ctx, matches) => {
    const bookId = matches[0].split('_')[1];
    ctx.session.state = STATE_LIST.SHARED_USE;
    ctx.session.sateData = { bookId };
    ctx.reply('نحوه استفاده از اموزش', sharedUseButtons);
  },
  ACTION_USE: async (ctx, matches) => {
    const shareUse = matches[0].split('_')[1];
    const isShareUse = shareUse === 'TRUE';
    let user = await User.findOne({ telId: userTel.id });
    if (user) {
      user.cart.push({
        book: ctx.session.stateData.bookId,
        shareUse: isShareUse,
      });
    }
    ctx.session.stateData = undefined;
    ctx.session.state = undefined;
  },
};
