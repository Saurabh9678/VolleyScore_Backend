const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide the Team Name"],
  },
  logo: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  players: [
    {
      playerName: {
        type: String,
        trim: true,
      },
      jerseyNo: { type: Number},
    },
  ],
  matches: [
    {
      match: {
        type: mongoose.Schema.ObjectId,
      },
    },
  ],
  totalWins: { type: Number },
  totalLoss: { type: Number },
  role: { type: String, default: "Team" },
});

teamSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Compare Password

teamSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = new mongoose.model("Team", teamSchema);
