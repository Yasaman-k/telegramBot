const { convertArrayToNColumn } = require('./DataUtil');

const MAIN_BUTTON_TEXT = {
  COMMENT: 'suggestions',
  CREATECat: 'create cat',
  VIEW: 'view categories',
  REPORTS: 'reports',
};

// use  option+shift to select each line
const mainButtons = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: MAIN_BUTTON_TEXT.COMMENT }],
      [{ text: MAIN_BUTTON_TEXT.CREATE }, { text: MAIN_BUTTON_TEXT.VIEW }, { text: MAIN_BUTTON_TEXT.REPORTS }],
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

module.exports = { categoryList, booksListButtons, mainButtons, MAIN_BUTTON_TEXT };
