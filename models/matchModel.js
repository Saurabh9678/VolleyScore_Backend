const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  code: { type: String, trim: true },
  organiser:{type:mongoose.Schema.ObjectId},
  team_no_1:{type:mongoose.Schema.ObjectId},
  team_no_2:{type:mongoose.Schema.ObjectId},
  sets:[
    {
        set_no:{
            type:Number,
        },
        setWinner:{
            type:String,
        },
        team_1_score:{type:Number},
        team_2_score:{type:Number},
        playersScore:[
            {
                jerseyNo:{type:Number},
                score:{type:Number}
            }
        ]
    }
  ],
  gameStatus:{
    type:String,
    default:"Not started"
  }
});


module.exports = new mongoose.model("Match", matchSchema)