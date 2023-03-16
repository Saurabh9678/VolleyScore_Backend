const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  code: { type: String, trim: true },
  organiser: { type: mongoose.Schema.ObjectId, ref: "Organiser" },
  team_no_1: { type: mongoose.Schema.ObjectId, ref: "Team" },
  team_no_1_joined:{type:Number,default:0},
  team_no_2: { type: mongoose.Schema.ObjectId, ref: "Team" },
  team_no_2_joined:{type:Number,default:0},
  sets: [
    {
      set_no: {
        type: Number,
      },
      setWinner: {
        type: String,
      },
      team_1_score: { type: Number, default: 0 },
      team_2_score: { type: Number, default: 0 },
      playersScore: [
        {
            
          jerseyNo: { type: Number },
          score: { type: Number },
        },
      ],
    },
  ],
  gameStatus: {
    type: String,
    default: "Not started",
  },
});

module.exports = new mongoose.model("Match", matchSchema);
