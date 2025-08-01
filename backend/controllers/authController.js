import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../model/Admin.js";

import Answer from "../model/Answer.js";
import Feedback from "../model/Feedback.js";

const JWT_SECRET = process.env.JWT_SECRET;
// Register Controller
export const Register = (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  bcrypt.hash(password, 10)
    .then(hashedPassword => {
      const newUser = new User({
        name,
        username,
        password: hashedPassword
      });

      newUser.save()
        .then(() => {
          return res.json({ message: "User registered" });
        })
        .catch(err => {
          console.error("Error saving user:", err);
          return res.status(500).json({ message: "Failed to register user" });
        });
    })
    .catch(err => {
      console.error("Hashing error:", err);
      return res.status(500).json({ message: "Error hashing password" });
    });
};

// Login Controller
export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.json({ message: "Invalid username or password" });
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.json({ message: "Invalid username or password" });
          }

          const token = jwt.sign(
            {
              userId: user._id,
              username: user.username
            },
            JWT_SECRET
          );

          return res.json({
            message: "Login successful",
            token,
            user: {
              _id: user._id,
              name: user.name,
              username: user.username
            }
          });
        })
        .catch(err => {
          console.error("Password compare error:", err);
          return res.status(500).json({ message: "Server error" });
        });
    })
    .catch(err => {
      console.error("Find user error:", err);
      return res.status(500).json({ message: "Server error" });
    });
};



export const adminLogin=(req,res)=>{
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  Admin.findOne({email}).then(admin=>{

    if(!admin){
      return res.json({message:"Invalid email or password"});
    }

    bcrypt.compare(password, admin.password).then(isMatch=>{
      if(!isMatch){
        return res.json({message:"Invalid email or password"});
      }

      const token = jwt.sign(
        {
          adminId: admin._id,
          email: admin.email
        },
        JWT_SECRET
      );

      return res.json({
        message: "Login successful",
        token,
        user: {
          _id: admin._id,
          name: admin.name,
          email: admin.email
        }
      });
    }).catch(err=>{
      console.error("Password compare error:", err);
      return res.status(500).json({message:"Server error"});
    });

  })
}



export const getUsers=async (req,res)=>{
  try{
     const users=await User.find();
     const userData= await Promise.all(users.map(async(user)=>{
      const answers= await Answer.find({username:user.username});
      console.log("User's answers:", answers);
      return{
        name: user.name,
        username: user.username,
        answersCount: answers.length,
        answers: answers.map(answer => ({
          question: answer.question,
          answer: answer.answer,
          feedback: answer.feedback,
          createdAt: answer.createdAt
        })) 
      }
      
    
     }))
      res.status(200).json(userData);
  }catch(error){
    console.error("Error fetching users:", error);
    res.status(500).json({message:"Server error"});
  }
}


export const deleteUser=async(req,res)=>{
  const username=req.params.username;
  try{
    const user=await User.findOneAndDelete({username});
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    await Answer.deleteMany({username});
    res.status(200).json({message:"User deleted successfully"});

  }catch(error){
    console.error("Error deleting user:", error);
    res.status(500).json({message:"Server error"});
  }
}

export const getUsersCount=async(req,res)=>{
  try{
    const count=await User.countDocuments();
    res.status(200).json({count});
  }catch(error){
    console.error("Error fetching user count:", error);
    res.status(500).json({message:"Server error"});
  }
}

export const feedback=async(req,res)=>{
 const {feedback, userId} = req.body ;
  if(!feedback || !userId){
    return res.status(400).json({message:"Feedback and userId are required"});
  }
  try{
    const newFeedback = new Feedback({
      userId,
      feedback
    });
    await newFeedback.save();
    res.status(200).json({success:true, message:"Feedback submitted successfully"});
  }catch(error){
    console.error("Error saving feedback:", error);
    res.status(500).json({success:false, message:"Failed to submit feedback"});
  }
}
