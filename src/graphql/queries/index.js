const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const queries = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-9) === ".query.js"
    );
  })
  .forEach((file) => {
    const query = require(path.join(__dirname, file));
    // const name =
    //   file.split(".")[0][0].toUpperCase() + file.split(".")[0].slice(1);
    // queries[name] = query;
    Object.assign(queries, query);
  });

module.exports = queries;
