const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Match = require("../models/matchModel");
const {createCode} = require("../helper/createCode")

//Get Match detail
exports.getMatchDetail = catchAsyncErrors(async(req,res,next)=>{
    const match = await Match.findOne({code: req.params.code})
    if(!match){
        return next(new ErrorHandler("No match found",400))
    }
    res.status(200).json(match)
})

//Create Room 
exports.createRoom = catchAsyncErrors(async(req,res,next)=>{
    const code = await createCode();
    const organiser = req.user._id;
    const match = await Match.create({
        code,
        organiser
    })
    res.status(200).json(match)
})