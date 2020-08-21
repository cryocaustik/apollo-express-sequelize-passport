const { AuthenticationError } = require("apollo-server-express");
const { RefreshToken } = require("../../models");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

/**
 * Generates JWT Token using a User instance
 * @param {*} user models.User instance
 */
const generateToken = async (user) => {
  const refreshToken = await generateRefreshToken(user);
  return {
    token: jwt.sign(
      {
        data: {
          id: user.id,
          username: user.username,
          refreshToken: refreshToken,
        },
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    ),
    refreshToken: refreshToken,
  };
};

/**
 * Generates JWT Refresh Token using a User Instance, removing any previous refresh tokens
 * @param {*} user models.User istance
 */
const generateRefreshToken = async (user) => {
  // delete any existing refresh tokens
  RefreshToken.destroy({
    where: {
      userId: user.id,
    },
  });

  // generate and store new token
  const token = await RefreshToken.create({
    userId: user.id,
    token: jwt.sign(
      {
        data: {
          userId: user.id,
        },
      },
      process.env.TOKEN_SECRET
    ),
  });

  // return refresh token only
  return token.token;
};

module.exports = {
  /**
   * Register new user and return JWT auth and refresh tokens.
   * @param {*} _ Apollo Server Parent
   * @param {*} param1 Email, Username, Password
   * @param {*} param2 Sequelize Models
   */
  async register(_, { name, username, email, password }, { models }) {
    // check if username / email exist
    const exists = await models.User.findOne({
      where: {
        [Op.or]: [{ email: email }, { username: username }],
      },
    });
    if (exists) throw Error("username or email already exists.");

    const user = await models.User.create({
      name: name ? name : username,
      username: username,
      email: email,
      password: password,
    });

    await models.Role.create({
      userId: user.id,
      name: "User",
    });

    return await generateToken(user);
  },
  /**
   * Authenticate User and return JWT auth token
   * @param {*} _ Apollo Server Parent
   * @param {*} param1 Username, Password
   * @param {*} param2 Sequelize Models
   */
  async login(_, { username, password }, { models }) {
    const user = await models.User.scope("withPassword").findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      return new AuthenticationError("user not found");
    }
    if (!(await user.validPassword(password))) {
      return new AuthenticationError("invalid username/password");
    }

    user.update({ lastLogin: new Date() });
    const token = await generateToken(user);
    return token;
  },

  /**
   * Verifies given refreshToken and returns new auth token
   * @param {*} _ Apollo Server Parent
   * @param {*} param1 refreshToken
   * @param {*} param2 Sequelize Models
   */
  async refreshToken(_, { refreshToken }, { models }) {
    // verify token encryption
    let verifiedToken;
    try {
      verifiedToken = jwt.verify(refreshToken, process.env.TOKEN_SECRET);
    } catch (err) {
      return new AuthenticationError("invalid refresh token");
    }

    const dbToken = await RefreshToken.findOne({
      where: {
        userId: verifiedToken.data.userId,
        token: refreshToken,
      },
      include: models.User,
    });

    // err if token does not exist or is expired
    if (!dbToken || moment(dbToken.expiresAt) >= moment())
      return new AuthenticationError("invalid refresh token");

    const newAuthToken = await generateToken(dbToken.User);

    return newAuthToken;
  },
};
