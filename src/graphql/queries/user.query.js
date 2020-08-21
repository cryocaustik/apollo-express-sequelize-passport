module.exports = {
  async profile(_, args, { user }) {
    return user;
  },
  async user(_, { id }, { models }) {
    return models.User.findByPk(id);
  },
  async allUsers(_, args, { models }) {
    return models.User.findAll();
  },
  async role(_, { userId }, { models }) {
    return models.Role.findAll({ where: { userId: userId } });
  },
  async rolesByName(_, { roleName }, { models }) {
    return models.Role.findAll({ where: { name: roleName } });
  },
  async allRoles(_, args, { models }) {
    return models.Role.findAll();
  },
};
