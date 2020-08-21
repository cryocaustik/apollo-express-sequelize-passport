const mutations = require("./mutations");
const resolvers = require("./resolvers");
const queries = require("./queries");
const schema = require("./schema");

resolvers["Mutation"] = mutations;
resolvers["Query"] = queries;

module.exports = {
  resolvers,
  schema,
};
