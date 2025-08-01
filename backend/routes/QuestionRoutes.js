import express from "express";
import { addQuestion, bookmarkQuestion, getAnswer, getBookmark, getQuestion, removeBookmark, submitAnswer } from "../controllers/QuestionController.js";

const router = express.Router();

router.post("/addQuestion", addQuestion);
router.get("/getQuestion/:category", getQuestion);
router.post("/submitAnswer", (req, res, next) => {
  console.log("✅ /submitAnswer route HIT");
  next(); // pass to controller
}, submitAnswer);

router.get("/getAnswer/:username",getAnswer);
router.post("/bookmark", bookmarkQuestion);
router.delete("/removeBookmark",removeBookmark);
router.get("/getBookmark/:username",getBookmark );
export default router;
