import React from 'react';
import { useEffect } from 'react';
import feedback from '../../assets/feedback.png';
import group from '../../assets/group.png';
const AdminHome = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [usersCount, setUsersCount] = React.useState(0);
   useEffect(()=>{
    fetch("http://localhost:5000/auth/getUsersCount", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.count !== undefined) {
          setUsersCount(data.count);
        } else {
          console.error("Invalid response format:", data);
        }
      })
   })
  return (
    <div className="p-6 min-h-screen bg-[#f9fafb]">
      {/* Welcome */}
      <h1 className="text-3xl font-extrabold text-center mt-16 text-indigo-600">
        Welcome {user?.name}
      </h1>

      {/* Cards Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-10 w-full">
        {/* Total Users Card */}
        <div className="bg-slate-200 p-10 rounded-lg shadow-lg w-80 text-center">
          <img src={group} alt="User" className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Users</h2>
          <p className="text-2xl font-bold text-indigo-600">{usersCount}</p> 
        </div>

        {/* Feedback Card */}
        <div className="bg-slate-200 p-10 rounded-lg shadow-lg w-80 text-center">
          <img src={feedback} alt="Feedback" className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Feedback</h2>
          <p className="text-2xl font-bold text-indigo-600">2</p> 
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
