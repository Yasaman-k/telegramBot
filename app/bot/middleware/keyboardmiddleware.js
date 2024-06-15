const { MAIN_BUTTON_TEXT } = require('../ButtonManager');
module.exports = (ctx, next) => {
  if (!ctx.message) return next();
  const text = ctx.message.text;
  if (text) if (Object.values(MAIN_BUTTON_TEXT).includes(text) && EventListener[text]) return EventListener[text](ctx);
  // when i call next() func it  continues in project and  run another project
  next();
};

const EventListener = {
  [MAIN_BUTTON_TEXT.CREATE]: (ctx) => {
    ctx.reply('create');
  },
};
