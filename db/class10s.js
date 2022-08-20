const mongoose = require("mongoose");

const quesSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true  
    },
    email: {
        type:String,
        required:true
    },
    
    ques: {
        type:String,
        required:true
    },
    image:{
        type:String
    }
});

const Question = new mongoose.model("Question",quesSchema);
module.exports = Question;