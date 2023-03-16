const Match = require("../models/matchModel")

export async function createCode(){
    let code = Math.floor(Math.random()*100000000);
    let m = await Match.findOne({code})
    while (m) {
        code = Math.floor(Math.random()*100000000);
        m = await Match.findOne({code})
    }
    return code;
}