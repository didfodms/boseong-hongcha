require("dotenv").config({ path: "./.env" });
const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

/* const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PWD,
  database: process.env.DB,
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
*/

module.exports = pool;
