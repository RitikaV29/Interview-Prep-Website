import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import QuestionRoutes from "./routes/QuestionRoutes.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
 import Admin from './model/Admin.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Mount routes BEFORE listen
app.use("/auth",authRoutes)
app.use("/question", QuestionRoutes);
console.log("✅ QuestionRoutes mounted at /question");
const PORT = 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
