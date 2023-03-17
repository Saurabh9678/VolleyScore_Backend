const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Organiser = require("../models/organiserModel");
const Match = require("../models/matchModel");

//Register Organiser
exports.registerOrganiser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await Organiser.create({
    name,
    email,
    password,
  });
  res.status(200).json(user);
});

// Login User
exports.loginOrganiser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  const user = await Organiser.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  res.status(200).json(user);
});

//Get Organiser Detail
exports.getOrganiserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await Organiser.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("No Organizer Found", 400));
  }
  res.status(200).json(user);
});

//Get all match Details
exports.getAllMatchDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await Organiser.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("No Organizer Found", 400));
  }
  let mat = [];
  await Promise.all(user.matches.map(async (m) => {
    const match = await Match.findById(m._id).populate("team_no_1","name").populate("team_no_2", "name");
    mat.push(match); 
  }));

  res.status(200).json({matches: mat});
});

