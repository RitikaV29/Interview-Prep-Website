import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Performance = () => {
  const [answer, setAnswer] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")); 

  useEffect(() => {
    fetch(`http://localhost:5000/question/getAnswer/${user.username}`)
      .then(res => res.json())
      .then((data) => {
        setAnswer(data);
      })
      .catch(err => {
       console.log(err);
      });
  }, [user]);

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  return (
    <>
     
      <div className='pt-20 flex flex-col items-center mt-10'>
        <h1 className='font-bold text-2xl mb-6'>{user.name}'s Performance</h1>

        <button
          onClick={toggleAnswers}
          className='bg-blue-600 text-white px-6 py-2 rounded-lg mb-4 hover:bg-blue-700 transition-all duration-200'
        >
          {showAnswers ? 'Hide Attempted Questions' : 'Your Attempted Questions'}
        </button>

        {showAnswers && (
          answer.length === 0 ? (
            <p className='text-gray-500'>No answers submitted yet.</p>
          ) : (
            <div className='w-[80%] max-w-3xl'>
              {answer.map((item, index) => (
                <div
                  key={index}
                  className='bg-white shadow-md rounded p-4 mb-4 border border-gray-200'
                >
                  <p><strong>Question:</strong> {item.question}</p>
                  <p><strong>Your Answer:</strong> {item.answer}</p>
                  {item.feedback && (
                    <p className='text-sm text-green-700 mt-2'>
                      <strong>Feedback:</strong> {item.feedback}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )
        )}
       
      </div>
      
    </>
  );
};

export default Performance;
