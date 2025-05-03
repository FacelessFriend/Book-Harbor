const { Book, User, Like, Comment } = require("../../db/models");

const searchBooks = async (id) => {
  const data = await Book.findAll({
    order: [['title', 'ASC']],
    where: { user_id: +id },
    include: [
      { model: User, 
        as: "books_on_user", 
        attributes: ["id", "name"] },
      {
        model: Like,
        as: "book_like",
        attributes: ["id", "user_id", "book_id"]
      },
      { model: Comment, 
        as: "book_comment",
        attributes: ['id', 'opinion', 'user_id'],
        include: [{
          model: User,
          as: 'comment_on_user',
          attributes: ['name']
        }]
       },
    ],
  });

  return data;
};

const createBook = async (newBook) => {
  const data = await Book.create(newBook);

  return data;
};

const updateUserBook = async (id, newBook) => {
  const data = await Book.update(newBook, { where: { id: +id } });

  return data;
};

const deleteUsersBook = async (id) => {
  const data = await Book.destroy({ where: { id: +id } });

  return data;
};

module.exports = {
  searchBooks,
  createBook,
  updateUserBook,
  deleteUsersBook,
};
