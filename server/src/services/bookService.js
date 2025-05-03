const { Op } = require("sequelize");
const { Book, User, Like, Comment } = require("../../db/models");

const searchBooks = async () => {
  const data = await Book.findAll({
    order: [['title', 'ASC']],
  });

  return data;
};

const searchBooksOnTitle = async (title) => {
  const data = await Book.findAll({
    where: {
      title: {
        [Op.like]: `%${title}%`
      }
    },
    order: [['title', 'ASC']],
  });

  return data;
};

const searchBook = async (id) => {
  const data = await Book.findOne({
    where: { id }, 
    attributes: { 
      exclude: ['createdAt', 'updatedAt']
    },
    include: [
      {
        model: Like,
        as: "book_like",
        attributes: ["id","user_id","book_id"]
      },
      {
        model: User,
        as: "books_on_user",
        attributes: ["name"],
      },
      {
        model: Comment,
        as: "book_comment",
        attributes: ["id","opinion","user_id","book_id"],
        include: [{
          model: User,
          as:'comment_on_user',
          attributes: ['name']
        }]
      },
    ],
  });


  return data;
};

module.exports = {
  searchBooks,
  searchBook,
  searchBooksOnTitle
};
