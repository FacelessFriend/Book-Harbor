'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'books_on_user'
      })

      Book.hasMany(models.Like, {
        foreignKey: 'book_id',
        as: 'book_like',
        onDelete: 'CASCADE'
      })

      Book.hasMany(models.Comment, {
        foreignKey: 'book_id',
        as: 'book_comment',
        onDelete: 'CASCADE'
      })
    }
  }
  Book.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    opinion: DataTypes.TEXT,
    link: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};