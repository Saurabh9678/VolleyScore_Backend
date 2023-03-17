const express = require("express");
const {
  loginOrganiser,
  registerOrganiser,
  getOrganiserDetails,
  getAllMatchDetails
} = require("../controllers/organiserController");

const router = express.Router();

// router.route("/registerOrganiser").post(registerOrganiser);

// router.route("/loginOrganiser").post(loginOrganiser);

router.route("/organiser/:id").get(getOrganiserDetails);

router.route("/orgMatches/:id").get(getAllMatchDetails)

module.exports = router;
