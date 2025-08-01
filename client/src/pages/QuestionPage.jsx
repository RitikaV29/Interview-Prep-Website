import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const QuestionPage = () => {
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [loading, setLoading] = useState({});
  const [bookmarkedMap, setBookmarkedMap] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch questions
        const qRes = await fetch(`http://localhost:5000/question/getQuestion/${category}`);
        const questionsData = await qRes.json();
        setQuestions(questionsData);

        
        const bRes = await fetch(`http://localhost:5000/question/getBookmark/${user.username}`);
        const bookmarkData = await bRes.json();
      console.log("Bookmark Data:", bookmarkData);
        // Map bookmarked question IDs
        const bookmarkedIds = new Set(bookmarkData.map((b) => b.questionId._id));
        console.log("Bookmarked IDs:", bookmarkedIds);
        const bookmarkMap = {};

// This loop is:

// Going through every question,

// Checking: "Is this question’s ID in the bookmarked set?"

// Storing the result as true or false in bookmarkMap.


        questionsData.forEach((q) => {
          bookmarkMap[q._id] = bookmarkedIds.has(q._id);
        });

        setBookmarkedMap(bookmarkMap);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [category, user.username]);

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const toggleBookmark = async (questionId) => {
    const isBookmarked = bookmarkedMap[questionId];

    try {
      if (isBookmarked) {
        await fetch("http://localhost:5000/question/removeBookmark", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: user.username, questionId }),
        });
        setBookmarkedMap((prev) => ({ ...prev, [questionId]: false }));
      } else {
        await fetch("http://localhost:5000/question/bookmark", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: user.username, questionId }),
        });
        setBookmarkedMap((prev) => ({ ...prev, [questionId]: true }));
      }
    } catch (err) {
      console.error("Bookmark toggle error:", err);
    }
  };

  const handleSpeechToText = (index) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech recognition not supported.");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;

    let transcript = answers[index] || "";

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          transcript += res + " ";
        } else {
          interim += res;
        }
      }
      setAnswers((prev) => ({
        ...prev,
        [index]: transcript + interim,
      }));
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
      alert("Mic error: " + event.error);
    };

    recognition.start();
  };

  const handleSubmit = async (index, questionText) => {
    const answer = answers[index];
    if (!answer || !answer.trim()) return alert("Answer likho pehle!");

    setLoading((prev) => ({ ...prev, [index]: true }));

    try {
      const res = await fetch("http://localhost:5000/question/submitAnswer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: questionText,
          answer,
          username: user.username,
        }),
      });
      const data = await res.json();
      setFeedbacks((prev) => ({ ...prev, [index]: data.feedback }));
    } catch (error) {
      setFeedbacks((prev) => ({ ...prev, [index]: "Kuch galat ho gaya." }));
    } finally {
      setLoading((prev) => ({ ...prev, [index]: false }));
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-slate-100 py-20 px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 capitalize">
          {category} Questions
        </h2>

        {questions.length === 0 ? (
          <p className="text-gray-500 text-center">No questions found.</p>
        ) : (
          <div className="max-w-3xl mx-auto space-y-8">
            {questions.map((q, index) => (
              <div
                key={q._id}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
              >
                <div className="flex justify-between items-center ">
                  <p className="font-semibold text-lg text-gray-800 mb-3">
                    {index + 1}: {q.question}
                  </p>
                  <button onClick={() => toggleBookmark(q._id)} title="Bookmark">
                    {bookmarkedMap[q._id] ? (
                      <i className="fas fa-bookmark text-blue-600"></i>
                    ) : (
                      <i className="far fa-bookmark text-gray-400"></i>
                    )}
                  </button>
                </div>

                <textarea
                  placeholder="Write your answer here..."
                  value={answers[index] || ""}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="w-full p-4 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-500 resize-none min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleSubmit(index, q.question)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                  >
                    {loading[index] ? "Submitting..." : "Submit Answer"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSpeechToText(index)}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition flex items-center gap-2"
                    title="Speak your answer"
                  >
                    🎤
                  </button>
                </div>

                {feedbacks[index] && (
                  <div className="mt-5 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg text-blue-800">
                    <h4 className="font-semibold mb-1">AI Feedback:</h4>
                    <p>{feedbacks[index]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionPage;
