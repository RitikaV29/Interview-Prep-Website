import mongoose from "mongoose";
const answerSchema=new mongoose.Schema({
  username:String,
  question:String,
  answer:String,
  feedback:String,
  createdAt:{
    type:Date,
    default:Date.now
  }
 
})
const Answer=mongoose.model("Answer",answerSchema);
export default Answer;