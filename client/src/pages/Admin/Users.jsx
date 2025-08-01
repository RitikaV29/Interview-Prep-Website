import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // for toggling open user

  useEffect(() => {
    fetch("http://localhost:5000/auth/getUsers")
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const toggleAnswers = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleDelete=(username)=>{
    fetch(`http://localhost:5000/auth/deleteUser/${username}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setUsers(users.filter(user => user.username !== username));
          alert('User deleted successfully');
        } else {
          throw new Error('Failed to delete user');
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
      });
  }

  return (
    <div className='mt-24 px-4 w-full flex flex-col items-center'>
      <h1 className='text-3xl font-extrabold text-center mb-10 text-indigo-600'>📋 Registered Users</h1>

      <div className='w-full max-w-5xl'>
        {users.length === 0 ? (
          <p className='text-gray-500 text-center'>No users found.</p>
        ) : (
          users.map((user, idx) => (
            <div
              key={idx}
              className='mb-4 border rounded-lg shadow-md bg-white transition-all duration-300'
            >
              <div className='flex justify-between items-center p-4 bg-indigo-50'>
                <div>
                  <h2 className='font-semibold text-lg text-gray-800'>{user.name}</h2>
                  <p className='text-sm text-gray-600'>Username: {user.username}</p>
                  <p className='text-sm text-gray-600'>Total Answers: {user.answersCount}</p>
                </div>
                <div className='space-x-2'>
                <button
                  onClick={() => toggleAnswers(idx)}
                  className='bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 transition'
                >
                  {openIndex === idx ? 'Hide Answers' : 'Show Answers'}
                </button>
                  <button  className='bg-red-500 text-white px-4 py-1 rounded  transition' onClick={()=>handleDelete(user.username)}>Delete User</button>
                  </div>      
              </div>

              {openIndex === idx && (
                <div className='p-4 bg-gray-50'>
                  {user.answers && user.answers.length > 0 ? (
                    <ul className='space-y-4 list-disc ml-5 text-sm'>
                      {user.answers.map((ans, i) => (
                        
                        <li key={i}>
                          <p><strong>Q:</strong> {ans.question}</p>
                          <p><strong>A:</strong> {ans.answer}</p>
                          {ans.feedback && <p><strong>Feedback:</strong> {ans.feedback}</p>}
                          <p className='text-xs text-gray-500'>Answered on: {new Date(ans.createdAt).toLocaleString()}</p>
                        </li>
                      
                      ))}
                    </ul>
                  ) : (
                    <p className='text-gray-500 italic'>No answers available.</p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Users;
