const express = require("express");
const {
  createRoom,
  getMatchDetail,
  joinRoom,
  startRoom,
} = require("../controllers/matchController");

const router = express.Router();

router.route("/match/:code").get(getMatchDetail).post(startRoom);

router.route("/createRoom/:id").post(createRoom);

router.route("/joinRoom/:code/:id").post(joinRoom);

module.exports = router;
