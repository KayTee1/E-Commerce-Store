const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: "root",
  password: "password",
  database: "react_store",
  waitForConnections: true,
  connectionLimit: 10,
});

/*
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
});
console.log(process.env.MYSQL_HOST)
console.log(process.env.MYSQL_USERNAME)
console.log(process.env.MYSQL_PASSWORD)
console.log(process.env.MYSQL_DATABASE)
console.log(process.env.VITE_API_URL)
*/
module.exports = pool;
