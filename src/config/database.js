const mysql = require("mysql2");

const dbPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "express-api",
});

module.exports = dbPool.promise();
