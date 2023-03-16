const express = require("express")
const {loginTeam,registerTeam} = require("../controllers/teamController")

const router = express.Router();

router.route("/registerTeam").post(registerTeam);

router.route("/loginTeam").post(loginTeam)

module.exports = router