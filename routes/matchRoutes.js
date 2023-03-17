const express = require("express");
const {
  createRoom,
  getMatchDetail,
  joinRoom,
  startRoom,
  updateScore
} = require("../controllers/matchController");

const router = express.Router();

router.route("/match/:code").get(getMatchDetail);

router.route("/startRoom/:code").get(startRoom);

router.route("/createRoom/:id").get(createRoom);

router.route("/joinRoom/:code/:id").get(joinRoom);

router.route("/updateScore/:id").post(updateScore)

module.exports = router;
