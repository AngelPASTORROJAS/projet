const express = require('express');
const UtilisateurController = require('../Controllers/UtilisateurController');
const utilisateurRouter = express.Router();

utilisateurRouter.get('', UtilisateurController.getUtilisateurs);
utilisateurRouter.get('/:id', UtilisateurController.getUtilisateurById);
utilisateurRouter.post('', UtilisateurController.createUtilisateur);
utilisateurRouter.put('/:id', UtilisateurController.updateUtilisateur);
utilisateurRouter.delete('/:id', UtilisateurController.deleteUtilisateur);

module.exports = utilisateurRouter;