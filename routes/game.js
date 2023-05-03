const express = require("express");
const games = require("../games.json");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { games, name: "" });
});

router.get("/game/:nomDuJeu", (req, res) => {
  const nomDuJeu = req.params.nomDuJeu;

  const configGame = games.find((jeu) => jeu.name === nomDuJeu);

  if (configGame) {
    res.render(configGame.name, { name: configGame.name });
  } else {
    res.status(404).send("Game not found");
  }
});

module.exports = router;
