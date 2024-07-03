const { hashedPassword } = require("../helpers/bcrypt");

("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.UserBookList, { foreignKey: `UserId` });
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Full name is required!" },
          notNull: { args: true, msg: "Full name is required!" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { args: true, msg: "Email is required!" },
          notNull: { args: true, msg: "Email is required!" },
          isEmail: { args: true, msg: "Invalid email format!" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Password is required!" },
          notNull: { args: true, msg: "Password is required!" },
          len: {
            args: [5],
            msg: "Password minimum length is 5 characters!",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "User",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance, option) => {
    instance.password = hashedPassword(instance.password);
  });
  return User;
};
