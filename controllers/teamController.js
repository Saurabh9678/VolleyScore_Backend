const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Team = require("../models/teamModel");

//Register Organiser
exports.registerTeam = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await Team.create({
    name,
    email,
    password,
  });
  res.status(200).json(user);
});

// Login User
exports.loginTeam = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  const user = await Team.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  res.status(200).json(user);
});

//Add player

exports.addPlayer = catchAsyncErrors(async (req, res, next) => {
  const { players } = req.body;
  const team = await Team.findById(req.params.id);
  let flag = 0;
  if (!team) {
    return next(new ErrorHandler("No team found", 400));
  }

  players.forEach((player) => {
    if (team.players.length === 0) {
      team.players.push(player);
    } else {
      team.players.forEach((p) => {
        if (p.jerseyNo === player.jerseyNo) {
          flag = 1;
          return next(
            new ErrorHandler(
              "Please provide a unique jersey number for all the players",
              400
            )
          );
        }
      });
      team.players.push(player);
    }
  });
  if (flag === 0) {
    await team.save({ validateBeforeSave: false });
  }

  res.status(200).json(team);
});

//Get Team details
exports.getTeamDetails = catchAsyncErrors(async (req, res, next) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    return next(new ErrorHandler("No teams found", 400));
  }
  res.status(200).json(team);
});
