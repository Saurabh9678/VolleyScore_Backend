const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Team = require("../models/teamModel");
const Organiser = require("../models/organiserModel");

//Register
exports.register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, digit } = req.body;
  if (digit === 0) {
    const user = await Organiser.create({
      name,
      email,
      password,
    });
    res.status(200).json(user);
  } else {
    const user = await Team.create({
      name,
      email,
      password,
    });
    res.status(200).json(user);
  }
});

// Login User
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, digit } = req.body;

  // checking if user has given password and email both

  if (digit === 1) {
    const user = await Team.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    res.status(200).json(user);
  } else {
    const user = await Organiser.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    res.status(200).json(user);
  }
});
