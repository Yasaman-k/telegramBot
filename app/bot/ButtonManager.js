const MAIN_BUTTON_TEXT = {
  COMMENT: 'suggestions',
  CREATE: 'create book',
  VIEW: 'view books',
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

module.exports = {
  mainButtons,
  MAIN_BUTTON_TEXT,
};
