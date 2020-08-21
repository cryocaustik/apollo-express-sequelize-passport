const bcrypt = require("bcryptjs");
const { ForbiddenError } = require("apollo-server-express");

module.exports = {
  async createUser(root, { name, email, password }, { models }) {
    return models.User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
  },
  async grantRole(_, { userId, roleName }, { models }) {
    const curRole = await models.Role.findOne({ where: { userId: userId } });
    if (curRole) {
      if (curRole.name === roleName) {
        throw new ForbiddenError("user already has requested role");
      }

      await curRole.destroy();
    }

    return models.Role.create({
      userId: userId,
      name: roleName,
    });
  },
};
