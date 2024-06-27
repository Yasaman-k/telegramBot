const { convertArrayToNColumn } = require('./DataUtil');

const MAIN_BUTTON_TEXT = {
  CREATECat: 'ایجاد ژانر',
  VIEW: 'ژانر ها',
  CREATEBook: 'create book',
  COMMENT: 'پیشنهادات و انتقادات',
  FAV: 'لیست علاقه مندی ها',
};

// use  option+shift to select each line
const mainButtons = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: MAIN_BUTTON_TEXT.CREATEBook }, { text: MAIN_BUTTON_TEXT.FAV }],
      [{ text: MAIN_BUTTON_TEXT.CREATECat }, { text: MAIN_BUTTON_TEXT.VIEW }, { text: MAIN_BUTTON_TEXT.COMMENT }],
    ],
  },
};

const bookDetailButtons = (book, caption = '', existInFav) => {
  return {
    reply_markup: {
      resize_keyboard: true,
      inline_keyboard: [
        [
          {
            text: 'افزودن به کتابخانه',
            callback_data: `CART_${book._id}`,
          },
        ],
        [
          {
            text: existInFav ? 'حذف از لیست علاقه مندی' : 'افزودن به لیست علاقه مندی',
            callback_data: `FAV_${book._id}`,
          },
        ],
        [
          {
            text: 'بازگشت',
            callback_data: 'BACK_CAT',
          },
        ],
      ],
    },
    caption,
  };
};

const commentsButtons = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [
      [
        {
          text: 'انتفاد',
          callback_data: 'یک انتقاد جدید',
        },
      ],
    ],
  },
};

const sharedUseButtons = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [
      [
        {
          text: 'استفاده تکی',
          callback_data: 'SHARED_USE_FALSE',
        },
      ],
    ],
  },
};

const categoryList = (data) => {
  return {
    reply_markup: {
      resize_keyboard: true,
      inline_keyboard: [
        ...convertArrayToNColumn(data, 2).map((item) =>
          item.map((item) => ({
            text: item.title,
            callback_data: `CAT_${item._id}`,
          })),
        ),
        [{ text: 'جستجو', callback_data: 'SEARCH' }],
      ],
    },
  };
};

const booksListButtons = (data) => {
  return {
    reply_markup: {
      resize_keyboard: true,
      inline_keyboard: [
        ...convertArrayToNColumn(data, 2).map((item) =>
          item.map((item) => ({
            text: item.name,
            callback_data: `BOOK_${item._id}`,
          })),
        ),
        [{ text: 'بازگشت', callback_data: 'BACK_CAT' }],
      ],
    },
  };
};

const booksListButtonsDetail = (data, caption = '') => {
  return {
    reply_markup: {
      resize_keyboard: true,
      inline_keyboard: [
        ...convertArrayToNColumn(data, 2).map((item) =>
          item.map((item) => ({
            text: item.name,
            callback_data: `BOOK_${item._id}`,
          })),
        ),
        [{ text: 'بازگشت', callback_data: 'BACK_CAT' }],
      ],
    },
    caption,
  };
};

module.exports = {
  categoryList,
  booksListButtons,
  mainButtons,
  MAIN_BUTTON_TEXT,
  commentsButtons,
  booksListButtonsDetail,
  bookDetailButtons,
  sharedUseButtons,
};
