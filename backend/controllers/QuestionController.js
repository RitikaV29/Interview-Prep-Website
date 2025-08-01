import {Bookmark,Question} from "../model/Question.js";

import Answer from "../model/Answer.js";

import { getOpenRouterFeedback } from '../config/openrouter.js';
import dotenv from 'dotenv';


dotenv.config();
export const addQuestion = (req, res) => {
  const { category, question, answer } = req.body;

  const newQuestion = new Question({ category, question, answer });
  newQuestion.save()
    .then(savedQuestion => {
      res.json({ message: "Question added", question: savedQuestion });
    })
    .catch(error => {
      res.status(500).json({ message: "Server error", error: error.message });
    });
};

export const getQuestion = (req, res) => {
  const category = req.params.category;
  Question.find({ category })
    .then(questions => {
      res.status(200).json(questions);
    })
    .catch(error => {
      res.status(500).json({ message: "Server error while fetching questions" });
    });
};




export const submitAnswer = async (req, res) => {
  try {
    const { question, answer,username } = req.body;
    console.log("✅ Received answer for question:", question);
    console.log("User's Answer:", answer);

    const feedback = await getOpenRouterFeedback(question, answer);
      const savedAnswer = await Answer.create({
      username,
      question,
      answer,
      feedback,
    });
        console.log("✅ Answer saved to DB:", savedAnswer);
    res.status(200).json({ feedback });
  } catch (error) {
    console.error("❌ Error in submitAnswer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAnswer = async (req, res) => {
  try {
    const { username } = req.params;

    const answers = await Answer.find({ username }); 

    res.status(200).json(answers);
  } catch (error) {
    console.error("❌ Error fetching answers:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const bookmarkQuestion = async (req, res) => {
  try {
    const { username, questionId } = req.body;

    if (!username || !questionId) {
      return res.status(400).json({ message: "Username and Question ID are required" });
    }

    // Check if the question already exists in bookmarks
    const existingBookmark = await Bookmark.findOne({ username, questionId });

    if (existingBookmark) {
      return res.status(409).json({ message: "Question already bookmarked" });
    }

    const newBookmark = new Bookmark({ username, questionId });
    await newBookmark.save();

    res.status(201).json({ message: "Question bookmarked successfully" });
  } catch (error) {
    console.error("❌ Error bookmarking question:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const removeBookmark = async (req, res) => {
  try {
    const { username, questionId } = req.body;
    await Bookmark.findOneAndDelete({ username, questionId });
    res.status(200).json({ message: "Bookmark removed" });
  } catch (err) {
    res.status(500).json({ message: "Error removing bookmark" });
  }
};

// GET /question/bookmarks/:username
export const getBookmark = async (req, res) => {
  try {
    const { username } = req.params;
    const bookmarks = await Bookmark.find({ username }).populate('questionId');
    res.status(200).json(bookmarks);
  } catch (error) {
    console.error("❌ Error fetching bookmarks:", error);
    res.status(500).json({ message: "Server error" });
  }
};
