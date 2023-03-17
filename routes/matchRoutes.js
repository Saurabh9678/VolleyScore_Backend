const express = require("express");
const {
  createRoom,
  getMatchDetail,
  joinRoom,
  startRoom,
  updateScore,checkJoinTeam, checkGameStatus, endGame
} = require("../controllers/matchController");

const router = express.Router();

router.route("/match/:code").get(getMatchDetail);

router.route("/startRoom/:code").get(startRoom);

router.route("/createRoom/:id").get(createRoom);

router.route("/joinRoom/:code/:id").get(joinRoom);

router.route("/check/:code").get(checkJoinTeam)

router.route("/updateScore/:id").post(updateScore)

router.route("/checkGameStatus/:code").get(checkGameStatus)

router.route("/endGame/:code").get(endGame)

module.exports = router;
