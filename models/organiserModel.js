const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const organiserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide the name"],
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
  matches: [
    {
      match: {
        type: mongoose.Schema.ObjectId,
      },
    },
  ],
  role: { type: String, default: "organiser" },
});

organiserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Compare Password

organiserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports =  new mongoose.model("Organiser",organiserSchema)
