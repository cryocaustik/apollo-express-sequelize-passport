module.exports = {
  User: {
    async role(user) {
      return user.getRole();
    },
  },
  Role: {
    async user(role) {
      return role.getUser();
    },
  },
};
