const { readFileSync } = require("fs");
const path = require("path");

module.exports = readFileSync(path.join(__dirname, "schema.gql"), {
  encoding: "utf-8",
});
