const UtilisateurService = require("../Services/utilisateurService");

class UtilisateurController {
  static async getUtilisateurs(req, res) {
    try {
      const utilisateurs = await UtilisateurService.getUtilisateurs();
      res.status(200).json(utilisateurs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUtilisateurById(req, res) {
    const id = req.params.id;
    try {
      const utilisateur = await UtilisateurService.getUtilisateurById(id);
      res.status(200).json(utilisateur);
    } catch (error) {
      if (error.message.includes("n'a pas été trouvé")) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  static async createUtilisateur(req, res) {
    const utilisateur = req.body;
    try {
      const nouvelUtilisateur = await UtilisateurService.createUtilisateur(
        utilisateur
      );
      res.status(201).json(nouvelUtilisateur);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateUtilisateur(req, res) {
    const id = req.params.id;
    const utilisateur = req.body;
    try {
      const utilisateurModifie = await UtilisateurService.updateUtilisateur(
        id,
        utilisateur
      );
      res.status(200).json(utilisateurModifie);
    } catch (error) {
      if (error.message.includes("n'a pas été trouvé")) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  static async deleteUtilisateur(req, res) {
    const id = req.params.id;
    try {
      const message = await UtilisateurService.deleteUtilisateur(id);
      res.status(200).json({ message });
    } catch (error) {
      if (error.message.includes("n'a pas été trouvé")) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }
}

module.exports = UtilisateurController;
