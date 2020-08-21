const express = require("express");
const models = require("../models");
const passport = require("passport");
const JwtStrategy = require("./passport");
const { ApolloServer } = require("apollo-server-express");
const { resolvers, schema } = require("../graphql");
const { AuthDirective, RoleDirective } = require("../graphql/directives");

const server = express();

// configure passport.js
server.use(passport.initialize());
passport.use(JwtStrategy);

const authJWT = (req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate("jwt", { session: false }, (err, data, info) => {
      if (err) reject(err);
      resolve({ data, info });
    })(req, res);
  });

const gql_server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req, res }) => {
    const token = req.headers.authorization || "";
    let user = null;

    if (token) {
      const { data, info } = await authJWT(req, res);
      if (!data) console.debug("jwt authentication failed");
      req.user = data;
      user = data;
    }
    return { req, models, user };
  },
  schemaDirectives: {
    auth: AuthDirective,
    role: RoleDirective,
  },
});
gql_server.applyMiddleware({ app: server, path: "/gql" });

module.exports = server;
