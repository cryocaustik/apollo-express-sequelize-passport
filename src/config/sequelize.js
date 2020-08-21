const path = require("path");

require("dotenv-safe").config({
  path: path.join(__dirname, "../../.env"),
  sample: path.join(__dirname, "../../.env.example"),
  allowEmptyValues: process.env.NODE_ENV === "production" ? false : true,
});

let db = {};
if (process.env.DB_CONNECTION === "sqlite") {
  db.dialect = process.env.DB_CONNECTION;
  db.storage = process.env.DB_HOST;
} else {
  db.dialect = process.env.DB_CONNECTION;
  db.host = process.env.DB_HOST;
  db.username = process.env.DB_USERNAME;
  db.password = process.env.DB_PASSWORD;
  db.database = process.env.DB_DATABASE;
}

module.exports = db;
