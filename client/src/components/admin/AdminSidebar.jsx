import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../../assets/home.png';
import userIcon from '../../assets/group.png';
import questionIcon from '../../assets/question.png';

export const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    alert("Logout successful");
    window.location.href = '/adminlogin';
  };

  return (
    <div
      className={`bg-slate-100 text-gray-800 w-56 h-full p-4 fixed top-0 left-0 z-50 transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-transform duration-200 sm:translate-x-0 sm:static shadow-md`}
    >
      {/* Close button for mobile */}
      <button
        onClick={toggleSidebar}
        className="sm:hidden mb-4 text-black font-bold text-right w-full"
      >
        x
      </button>

      {/* User Info Section */}
      <div className=" flex-col  gap-2 flex md:flex-row justify-between items-center bg-indigo-100 text-indigo-700 px-4 py-3 rounded-lg mb-6 shadow-sm">
        <span className="text-base font-semibold">Hi,{user?.name}</span>
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600 text-sm font-medium transition"
        >
          Logout
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-4">
        <li className="flex items-center space-x-3 p-2 hover:bg-white rounded-lg transition">
          <img src={homeIcon} alt="home" className="w-5 h-5" />
          <Link to="/admindash" className="text-sm font-medium">Home</Link>
        </li>
        <li className="flex items-center space-x-3 p-2 hover:bg-white rounded-lg transition">
          <img src={userIcon} alt="users" className="w-5 h-5" />
          <Link to="users" className="text-sm font-medium">Users</Link>
        </li>
        <li className="flex items-center space-x-3 p-2 hover:bg-white rounded-lg transition">
          <img src={questionIcon} alt="questions" className="w-5 h-5" />
          <Link to="questions" className="text-sm font-medium">Questions</Link>
        </li>
      </ul>
    </div>
  );
};
