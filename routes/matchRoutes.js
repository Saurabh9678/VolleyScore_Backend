const express = require("express");
const {
  createRoom,getMatchDetail
} = require("../controllers/matchController");

const router = express.Router();

router.route("/match/:code").get(getMatchDetail)

router.route("/create")

module.exports = router;
