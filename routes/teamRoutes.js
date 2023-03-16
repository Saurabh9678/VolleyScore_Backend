const express = require("express")
const {loginTeam,registerTeam,addPlayer,getTeamDetails} = require("../controllers/teamController")

const router = express.Router();

router.route("/registerTeam").post(registerTeam);

router.route("/loginTeam").post(loginTeam)

router.route("/addPlayer/:id").post(addPlayer)

router.route("/team/:id").get(getTeamDetails)

module.exports = router