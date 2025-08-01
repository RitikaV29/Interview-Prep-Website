import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Profile from "../assets/profile.png";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 z-50 bg-gray-800 text-white shadow-md px-3 py-3 w-full">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">
          <Link to="/dashboard">InterviewPrep</Link>
        </div>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Items (Desktop) */}
        <div className="hidden md:flex items-center space-x-6 text-white">
          <Link to="/" className="hover:bg-white hover:text-black px-3 py-1 rounded-md font-medium transition duration-200">
            Home
          </Link>
           <Link to="/dash" className="hover:bg-white hover:text-black px-3 py-1 rounded-md font-medium transition duration-200">
            Dashboard
          </Link>
          {user ? (
            <>
              <Link to="/performance" className="hover:bg-white hover:text-black px-3 py-1 rounded-md font-medium transition duration-200">
                Performance
              </Link>

              <Link to="/profile" className="flex items-center gap-2 hover:bg-white hover:text-black px-3 py-1 rounded-md font-medium transition duration-200">
                <img
                  src={Profile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <span>{user.name}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="hover:bg-white hover:text-black px-3 py-1 rounded-md font-medium transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:bg-white hover:text-black px-3 py-1 rounded-md font-medium transition duration-200">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col space-y-3 text-gray-200 px-3 max-w-[90%] mx-auto">
           <Link to="/" className="hover:bg-white hover:text-black px-3  rounded-md font-medium transition duration-200">
            Home
          </Link>
          <Link to="/dash" onClick={() => setMenuOpen(false)} className="hover:bg-white hover:text-black px-3  rounded-md font-medium transition duration-200">
            Dashboard
          </Link>

          {user ? (
            <>
              <Link to="/performance" onClick={() => setMenuOpen(false)} className="hover:bg-white hover:text-black px-3 py-1 rounded-md font-medium transition duration-200">
                Performance
              </Link>

              <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:bg-white hover:text-black px-3 py-1 rounded-md font-medium transition duration-200">
                <img
                  src={Profile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <span>{user.name}</span>
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="hover:bg-white hover:text-black px-3 py-1 rounded-md font-medium transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:bg-white hover:text-black px-3  rounded-md font-medium transition duration-200">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
