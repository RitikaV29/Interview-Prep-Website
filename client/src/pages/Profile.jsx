import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from "../assets/profile.png";
import uparrow from "../assets/uparrow.png";
import downarrow from "../assets/downarrow.png";

const Profile = () => {
  const [result, setResult] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const [user, setUser] = useState(null);
  const [openIndex, setOpenIndex] = useState(null); // for toggling answers

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      alert("Please login first");
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5000/question/getAnswer/${user.username}`)
      .then((res) => res.json())
      .then((data) => setResult(data))
      .catch((err) => console.error(err));

    fetch(`http://localhost:5000/question/getBookmark/${user.username}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Bookmarked Questions:", data);
        setBookmarked(data);
      })
      .catch((err) => console.error(err));
  }, [user]);

  if (!user) return null;

  const lastAttempt = result.length > 0 ? result[result.length - 1] : null;

  return (
    <>
  
      <div className="pt-20 pr-8 flex flex-col    lg:flex-row  items-start gap-6 px-4 py-8 bg-slate-100 min-h-screen w-full ">
        {/* Left Panel */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Last Attempt</h2>
            {lastAttempt ? (
              <ul className="text-gray-600 space-y-1 pl-2">
                <li>🧠 <span className="font-medium">{lastAttempt.question}</span></li>
                <li>📅 <span className="font-medium">{new Date(lastAttempt.createdAt).toLocaleDateString()}</span></li>
              </ul>
            ) : (
              <p className="text-gray-500">No attempts yet.</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">📌 Bookmarked Questions</h2>
            {bookmarked.length > 0 ? (
              <ul className="space-y-4">
                {bookmarked.map((item, index) => (
                  <li key={index} className="text-black">
                    <div
                      className="flex items-center justify-between cursor-pointer bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200"
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                      <span>{item.questionId.question}</span>
                      <span className="text-xl">
                        {openIndex === index ? <img className="h-3 w-3" src={uparrow}/> : <img className="h-3 w-3" src={downarrow}/> }
                      </span>
                    </div>
                    {openIndex === index && (
                      <div className="mt-2 ml-4 text-sm text-gray-700 bg-gray-50 p-2 rounded-md border border-gray-200">
                        <strong>Answer:</strong> {item.questionId.answer}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">You haven't bookmarked any questions yet.</p>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-all">
          <img
            src={profile}
            alt="Profile"
            className="rounded-full w-28 h-28 object-cover border-4 border-blue-500 mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-500 mb-6">@{user.username}</p>

          <button className="w-32 bg-blue-600 text-white py-2 rounded-lg mb-3 hover:bg-blue-700 transition">
            Edit Profile
          </button>
          <Link
            to="/performance"
            className="w-36 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Your Performance
          </Link>
        </div>
      </div>
     
    </>
  );
};

export default Profile;
