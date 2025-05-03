'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Token, {
        foreignKey: 'user_id',
        as: 'refresh_token',
        onDelete: 'CASCADE'
      });

      User.hasMany(models.Book, {
        foreignKey: 'user_id',
        as: 'user_book',
        onDelete: 'CASCADE'
      })

      User.hasMany(models.Like, {
        foreignKey: 'user_id',
        as: 'user_like',
        onDelete: 'CASCADE'
      })

      User.hasMany(models.Comment, {
        foreignKey: 'user_id',
        as: 'user_comment'
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};