import React, { useState } from 'react';

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    category: '',
    question: '',
    answer: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/question/addQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      alert('Question added!');
      setFormData({
        category: '',
        question: '',
        answer: ''
      });
    })
    .catch(err => {
      console.error('Error:', err);
      alert('Something went wrong');
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
     <div className="bg-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md mx-4">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Add a New Question</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Category --</option>
              <option value="technical">Technical</option>
              <option value="behavioural">Behavioral</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Question</label>
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Enter question"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Answer</label>
            <textarea
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              placeholder="Enter answer"
              rows="4"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
