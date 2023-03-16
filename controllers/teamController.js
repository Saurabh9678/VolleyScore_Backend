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
