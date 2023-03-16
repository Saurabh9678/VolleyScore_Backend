const express = require("express")
const {loginOrganiser,registerOrganiser} = require("../controllers/organiserController")

const router = express.Router();

router.route("/registerOrganiser").post(registerOrganiser);

router.route("/loginOrganiser").post(loginOrganiser)

module.exports = router