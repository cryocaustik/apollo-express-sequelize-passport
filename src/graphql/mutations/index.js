const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const mutations = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-12) === ".mutation.js"
    );
  })
  .forEach((file) => {
    const mutation = require(path.join(__dirname, file));
    // const name =
    //   file.split(".")[0][0].toUpperCase() + file.split(".")[0].slice(1);
    // mutations[name] = mutation;
    Object.assign(mutations, mutation);
  });

module.exports = mutations;
