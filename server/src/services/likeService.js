const { Like, Book, User, Comment } = require('../../db/models');

const serchBooksOnLike = async (id) => {
    const data = await Like.findAll({
        where: {user_id: +id},
        include: [{
            model: Book,
            as: 'like_on_book', 
            include: [
              {
                model: User,
                as: 'books_on_user',
                attributes: ['name']
              },
              {
                model: Comment,
                as: 'book_comment',
                include: [{
                  model: User,
                  as: 'comment_on_user',
                  attributes: ['id', 'name']
                }]
              },
              {
                model: Like,
                as: 'book_like', 
                attributes: ['user_id',"book_id"] 
              }
            ]
          }],
          order: [[{ model: Book, as: 'like_on_book' }, 'title', 'ASC']]
    })

    return data
}

const placeLike = async (ids) => {
    const data = await Like.create(ids)

    return data
}

const delLike = async (ids) => {
    const {user_id,book_id} = ids
    const data = await Like.destroy({where:{user_id:+user_id,book_id:+book_id}})

    return data
}

module.exports = {
    serchBooksOnLike,
    placeLike,
    delLike
}