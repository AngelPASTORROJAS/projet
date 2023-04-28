
const express = require("express");

const app = express();
app.use(express.json());


// Importations des routes
// const adherentRouter = require("./Routes/AdherentRouter");

// Configuration des middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration des routes
// app.use("/Adherent", adherentRouter)

// Configuration des gestionnaires d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;