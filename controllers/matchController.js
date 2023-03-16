const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Match = require("../models/matchModel");
const Organiser = require("../models/organiserModel")
const Team = require("../models/teamModel")

//Get Match detail
exports.getMatchDetail = catchAsyncErrors(async(req,res,next)=>{
    const match = await Match.findOne({code: req.params.code}).populate("organiser", "name _id").populate("team_no_1", "_id name players").populate("team_no_2", "_id name players")
    if(!match){
        return next(new ErrorHandler("No match found",400))
    }
    res.status(200).json(match)
})

//Create Room 
exports.createRoom = catchAsyncErrors(async(req,res,next)=>{
    const code = Math.floor(Math.random()*100000000);
    const organiser = req.params.id;
    const match = await Match.create({
        code,
        organiser
    })
    const user = await Organiser.findById(req.params.id)
    user.matches.push(match._id)
    await user.save({ validateBeforeSave: false }) 
     const mat = await Match.findById(match._id).populate("organiser", "name _id")
    res.status(200).json(mat)
})

//Join room

exports.joinRoom = catchAsyncErrors(async(req,res,next)=>{
    const code = req.params.code
    const id = req.params.id
    const match = await Match.findOne({code})
    if(!match){
        return next(new ErrorHandler("No match Found",400))
    }
    if(match.team_no_1_joined===0){
        match.team_no_1 = id;
        match.team_no_1_joined =1;
    }else{
        if(match.team_no_2_joined===0){
            match.team_no_2 = id;
            match.team_no_2_joined = 1;
        }else{
            return next(new ErrorHandler("Room full",400))
        }
    }
    await match.save({ validateBeforeSave: false })
    const user = await Team.findById(req.params.id)
    user.matches.push(match._id)
    await user.save({ validateBeforeSave: false }) 
    const mat = await Match.findOne({code}).populate("organiser", "name _id").populate("team_no_1", "_id name players").populate("team_no_2", "_id name players")
    res.status(200).json(mat)
})


//Start Room 
exports.startRoom = catchAsyncErrors(async(req,res,next)=>{
    const match = await Match.findOne({code:req.params.code})
    if(!match){
        return next(new ErrorHandler("No match found",400))
    }
    if(match.team_no_1_joined===0 || match.team_no_2_joined===0){
        return next(new ErrorHandler("All teams have not joined yet",400))
    }
    match.gameStatus = "Ongoing";
    await match.save({ validateBeforeSave: false })
    const mat = await Match.findOne({code:req.params.code}).populate("organiser", "name _id").populate("team_no_1", "_id name players").populate("team_no_2", "_id name players")
    res.status(200).json(mat)
})
