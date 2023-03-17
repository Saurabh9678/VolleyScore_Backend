const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Team = require("../models/teamModel");
const Match = require("../models/matchModel")

// //Register Organiser
// exports.registerTeam = catchAsyncErrors(async (req, res, next) => {
//   const { name, email, password } = req.body;
//   const user = await Team.create({
//     name,
//     email,
//     password,
//   });
//   res.status(200).json(user);
// });

// // Login User
// exports.loginTeam = catchAsyncErrors(async (req, res, next) => {
//   const { email, password } = req.body;

//   // checking if user has given password and email both

//   const user = await Team.findOne({ email }).select("+password");

//   if (!user) {
//     return next(new ErrorHandler("Invalid email or password", 401));
//   }

//   const isPasswordMatched = await user.comparePassword(password);

//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Invalid email or password", 401));
//   }

//   res.status(200).json(user);
// });

//Add player

exports.addPlayer = catchAsyncErrors(async (req, res, next) => {
  const { players } = req.body;
  const user = await Team.findById(req.params.id);
  let flag = 0;
  if (!user) {
    return next(new ErrorHandler("No team found", 400));
  }

  players.forEach((player) => {
    if (user.players.length === 0) {
      user.players.push(player);
    } else {
      user.players.forEach((p) => {
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
      user.players.push(player);
    }
  });
  if (flag === 0) {
    await user.save({ validateBeforeSave: false });
  }

  res.status(200).json(user);
});

//Get Team details
exports.getTeamDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await Team.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("No teams found", 400));
  }
  res.status(200).json(user);
});

//Get all match Details
exports.getAllMatchDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await Team.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("No Team Found", 400));
  }
  let mat = [];
  await Promise.all(user.matches.map(async (m) => {
    const match = await Match.findById(m._id).populate("team_no_1","name").populate("team_no_2", "name");;
    mat.push(match); 
  }));

  res.status(200).json({matches:mat});
});


