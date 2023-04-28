
require("dotenv-expand").expand(require("dotenv").config());
const mysql2 = require('mysql2');

const APP = Object.freeze({
  PORT: process.env.PORT
});


const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL server!");
  
  connection.query(`CREATE DATABASE ${process.env.DB_NAME}`, function (err, result) {
    if (err) throw err;
    console.log("Database created!");
  });
});

module.exports = {connection, APP};
