const express = require("express");
const {
  loginOrganiser,
  registerOrganiser,
  getOrganiserDetails,
} = require("../controllers/organiserController");

const router = express.Router();

router.route("/registerOrganiser").post(registerOrganiser);

router.route("/loginOrganiser").post(loginOrganiser);

router.route("/organiser/:id").get(getOrganiserDetails);

module.exports = router;
