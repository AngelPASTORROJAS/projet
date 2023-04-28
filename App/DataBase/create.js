const { connection } = require("../Constant/Global");

const createUtilisateur= connection.query(
  `CREATE TABLE IF NOT EXISTS utilisateur (
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

module.exports = createUtilisateur