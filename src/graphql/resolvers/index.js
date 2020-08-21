const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const resolvers = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-12) === ".resolver.js"
    );
  })
  .forEach((file) => {
    const resolver = require(path.join(__dirname, file));
    // const name =
    //   file.split(".")[0][0].toUpperCase() + file.split(".")[0].slice(1);
    // resolvers[name] = resolver;
    Object.assign(resolvers, resolver);
  });

module.exports = resolvers;
