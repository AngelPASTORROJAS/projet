const { connection } = require("../Constant/Global");

class UtilisateurService {
  static getUtilisateurs() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM utilisateur", (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  }

  static getUtilisateurById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM utilisateur WHERE id = ?",
        id,
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results[0]);
        }
      );
    });
  }

  static createUtilisateur(utilisateur) {
    return new Promise((resolve, reject) => {
      const { nom, prenom, mail, motdepasse, role } = utilisateur;
      connection.query(
        "INSERT INTO utilisateur (nom, prenom, mail, motdepasse, role) VALUES (?, ?, ?, ?, ?)",
        [nom, prenom, mail, motdepasse, role],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve({ id: results.insertId, ...utilisateur });
        }
      );
    });
  }

  static updateUtilisateur(id, utilisateur) {
    return new Promise((resolve, reject) => {
      const { nom, prenom, mail, motdepasse, role } = utilisateur;
  
      // Build the SET clause of the SQL query based on the non-null properties of the utilisateur object
      let setClause = "";
      const values = [];
      if (nom != null) {
        setClause += "nom = ?, ";
        values.push(nom);
      }
      if (prenom != null) {
        setClause += "prenom = ?, ";
        values.push(prenom);
      }
      if (mail != null) {
        setClause += "mail = ?, ";
        values.push(mail);
      }
      if (motdepasse != null) {
        setClause += "motdepasse = ?, ";
        values.push(motdepasse);
      }
      if (role != null) {
        setClause += "role = ?, ";
        values.push(role);
      }
  
      // Remove the trailing comma and space from the SET clause if it exists
      if (setClause.endsWith(", ")) {
        setClause = setClause.slice(0, -2);
      }
  
      // Add the id parameter to the values array
      values.push(id);
  
      // Build the full SQL query
      const sqlQuery = `UPDATE utilisateur SET ${setClause} WHERE id = ?`;
  
      connection.query(sqlQuery, values, (error, results) => {
        if (error) {
          return reject(error);
        }
        if (results.affectedRows === 0) {
          return reject(new Error(`L'utilisateur avec l'id ${id} n'a pas été trouvé`));
        }
        return resolve({ id, ...utilisateur });
      });
    });
  }

  static deleteUtilisateur(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM utilisateur WHERE id = ?",
        id,
        (error, results) => {
          if (error) {
            return reject(error);
          }
          if (results.affectedRows === 0) {
            return reject(
              new Error(`L'utilisateur avec l'id ${id} n'a pas été trouvé`)
            );
          }
          return resolve(
            `L'utilisateur avec l'id ${id} a été supprimé avec succès`
          );
        }
      );
    });
  }
}

module.exports = UtilisateurService;
