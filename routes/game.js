const express = require("express");
const games = require("../games.json");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { games, config: "" });
});

router.get("/game/:gameName", (req, res) => {
  const gameName = req.params.gameName;

  const configGame = games.find((game) => game.name === gameName);

  configGame
    ? res.render(configGame.name, { config: configGame })
    : res.status(404).send("Game not found");
});

module.exports = router;
