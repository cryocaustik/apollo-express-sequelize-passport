const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.RefreshToken);
      User.hasOne(models.Role);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    }
  );

  /**
   * Verify given password to hashed user password in db
   * @param {string} password user password to verify
   */
  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  User.prototype.isAdmin = async function () {
    const roleName = "Admin";
    const roles = await this.getRoles({ where: { name: roleName } });
    return roles ? roles.some((r) => r.name === roleName) : false;
  };

  return User;
};
