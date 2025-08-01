import mongoose from "mongoose";
const questionSchema=new mongoose.Schema({
  category:{
    type:String,
    enum:["technical","hr","behavioural"],
    required:true,
  },
  question:{
    type:String,
    required:true,
  },
  answer:{
    type:String,
    required:true,
  }
})


const bookmarkSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}); 
const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
const Question=mongoose.model("Question",questionSchema);
export { Question, Bookmark }; // Export both models