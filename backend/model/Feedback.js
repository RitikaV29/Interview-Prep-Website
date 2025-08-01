import mongoose from 'mongoose';
const FeedbackSchema=new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  feedback:{
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }

})
const Feedback=mongoose.model("Feedback",FeedbackSchema);
export default Feedback;