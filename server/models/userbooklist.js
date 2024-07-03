"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBookList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserBookList.belongsTo(models.User, { foreignKey: `UserId` });
      UserBookList.belongsTo(models.Book, { foreignKey: `BookId` });
    }
  }
  UserBookList.init(
    {
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Want to read",
        validate: {
          notEmpty: { args: true, msg: `Status is required!` },
          notNull: { args: true, msg: `Status is required!` },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: `UserId is Required!` },
          notNull: { args: true, msg: `UserId is Required!` },
        },
      },
      BookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: `BookId is Required!` },
          notNull: { args: true, msg: `BookId is Required!` },
        },
      },
    },
    {
      sequelize,
      modelName: "UserBookList",
    }
  );
  return UserBookList;
};
