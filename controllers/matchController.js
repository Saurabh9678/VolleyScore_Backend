const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Match = require("../models/matchModel");
const Organiser = require("../models/organiserModel");
const Team = require("../models/teamModel");

//Get Match detail
exports.getMatchDetail = catchAsyncErrors(async (req, res, next) => {
  const match = await Match.findOne({ code: req.params.code })
    .populate("organiser", "name _id")
    .populate("team_no_1", "_id name players")
    .populate("team_no_2", "_id name players");
  if (!match) {
    return next(new ErrorHandler("No match found", 400));
  }
  res.status(200).json(match);
});

//Create Room
exports.createRoom = catchAsyncErrors(async (req, res, next) => {
  const code = Math.floor(Math.random() * 100000000);
  const organiser = req.params.id;
  const match = await Match.create({
    code,
    organiser,
  });
  const user = await Organiser.findById(req.params.id);
  user.matches.push(match._id);
  await user.save({ validateBeforeSave: false });
  const mat = await Match.findById(match._id).populate("organiser", "name _id");
  res.status(200).json(mat);
});

//Join room

exports.joinRoom = catchAsyncErrors(async (req, res, next) => {
  const code = req.params.code;
  const id = req.params.id;
  const match = await Match.findOne({ code });
  if (!match) {
    return next(new ErrorHandler("No match Found", 400));
  }
  if (match.team_no_1_joined === 0) {
    match.team_no_1 = id;
    match.team_no_1_joined = 1;
  } else {
    if (match.team_no_2_joined === 0) {
      match.team_no_2 = id;
      match.team_no_2_joined = 1;
    } else {
      return next(new ErrorHandler("Room full", 400));
    }
  }
  await match.save({ validateBeforeSave: false });
  const user = await Team.findById(req.params.id);
  user.matches.push(match._id);
  await user.save({ validateBeforeSave: false });
  const mat = await Match.findOne({ code })
    .populate("organiser", "name _id")
    .populate("team_no_1", "_id name players")
    .populate("team_no_2", "_id name players");
  res.status(200).json(mat);
});

//Start Room
exports.startRoom = catchAsyncErrors(async (req, res, next) => {
  const match = await Match.findOne({ code: req.params.code });
  
  match.gameStatus =1;
  await match.save({ validateBeforeSave: false });
  const mat = await Match.findOne({ code: req.params.code })
    .populate("organiser", "name _id")
    .populate("team_no_1", "_id name players")
    .populate("team_no_2", "_id name players");
  res.status(200).json(mat);
});

//Check Joined Team
exports.checkJoinTeam = catchAsyncErrors(async (req, res, next) => {
  const match = await Match.findOne({ code: req.params.code })
    .populate("team_no_1", "name")
    .populate("team_no_2", "name");
  // if(match.team_no_1_joined===0 || match.team_no_2_joined===0){
  //     return next(new ErrorHandler("All teams have not joined yet",400))
  // }
  res.status(200).json({
    team_no_1_joined: match.team_no_1_joined,
    team_no_2_joined: match.team_no_2_joined,
    team_no_1_name: match.team_no_1.name,
    team_no_2_name: match.team_no_2.name,
  });
});

//Update Score
exports.updateScore = catchAsyncErrors(async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id);
    const { sets } = req.body;
    let set_Flag = 0;
    let p_flag = 0;
    if (match.sets.length === 0) {
      match.sets[0] = sets[0];
    } else {
      match.sets.forEach((s) => {
        if (s.set_no === sets[0].set_no) {
          set_Flag = 1;
          (s.setWinner = sets[0].setWinner),
            (s.team_1_score = sets[0].team_1_score),
            (s.team_2_score = sets[0].team_2_score),
            s.playersScore.forEach((p) => {
              if (p.jerseyNo === sets[0].playersScore[0].jerseyNo) {
                p.score = sets[0].playersScore[0].score;
                p_flag = 1;
              }
            });
          if (p_flag === 0) {
            s.playersScore.push(sets[0].playersScore[0]);
          }
        }
      });
      if (set_Flag === 0) {
        match.sets.push(sets[0]);
      }
    }

    console.log(match.sets.length);
    await match.save({ validateBeforeSave: false });
    res.status(200).json(match);
  } catch (error) {
    next(error);
  }
});


//Check game Status 
exports.checkGameStatus = catchAsyncErrors(async(req,res,next)=>{
    const match = await Match.findOne({code:req.params.code})
    res.status(200).json(match.gameStatus)
})

//End Game 
exports.endGame = catchAsyncErrors(async(req,res,next)=>{
    const match = await Match.findOne({code:req.params.code})
    match.gameStatus =2;
    await match.save({ validateBeforeSave: false });
    res.status(200).json("Game ended")
})