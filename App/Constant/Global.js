require("dotenv-expand").expand(require("dotenv").config());
const mysql2 = require("mysql2");

const APP = Object.freeze({
  PORT: process.env.PORT,
});

const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
});

connection.connect(function (err) {
  if (err) {
    console.error("Failed to connect to MySQL server:", err);
    return;
  }
  console.log("Connected to MySQL server!");
  connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
    function (err, result) {
      if (err) {
        console.error("Failed to create database:", err);
        return;
      }
      console.log("Database created!");
    }
  );
  connection.query(
    `CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.utilisateur (
        id INT NOT NULL AUTO_INCREMENT,
        nom VARCHAR(50),
        prenom VARCHAR(50),
        mail VARCHAR(100),
        motdepasse VARCHAR(255),
        role VARCHAR(20),
        PRIMARY KEY (id)
      );`,
    function (error, results, fields) {
      if (error) {
        console.error("Error creating table:", error);
      }
      console.log("Table created successfully");
    }
  );
});


module.exports = { connection, APP };