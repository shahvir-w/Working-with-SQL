require("dotenv").config();
const mysql = require("mysql2/promise");

const mySqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: "students_db",
  waitForConnections: true,
});

module.exports = mySqlPool;
