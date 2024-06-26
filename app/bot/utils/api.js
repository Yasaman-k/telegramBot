const Category = require('../../model/category');
const Book = require('../../model/book');

const insertOneBook = async () => {
  // ctx.reply('write the name');
  // ctx.reply('write category');
  // ctx.reply('upload photo');

  const book = new Book({
    name: 'دزیره',
    photo: 'AgACAgQAAxkBAAIEJmZ5QrMVUGWoXaLxX-xXf9BdGEteAAI1wDEbSSPIU65An73xa27uAQADAgADcwADNQQ',
    cat: ['667413c20c88be99da0af7ae', '666d8aebe9727eaeff6aa024'],
  });
  await book.save();
  // ctx.reply('upload photo');
  // const book = new Book({
  //   name: 'دزیره',
  //   report: 'page 89',
  //   meta: [{ key: '15 june', value: 'page 80' }],
  //   photo:
  //     'https://dkstatics-public.digikala.com/digikala-products/9257abcf926b66bfdfdcf550fa1e7db82f281628_1595165673.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90',
  //   cat: ['667413c20c88be99da0af7ae', '666d8aebe9727eaeff6aa024'],
  // });
  // await book.save();
};

const insertOneCategory = async (title, ctx) => {
  const isExist = await Category.findOne({ title });
  if (!isExist) {
    const cat = new Category({
      title,
    });
    await cat.save();
    ctx.reply('this category successfully add');
  } else ctx.reply('this category is already exist');
};

module.exports = { insertOneBook, insertOneCategory };
