import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import Home from './Home';
import Footer from '../components/Footer';

const Dashboard = () => {
  console.log("User from localStorage:", localStorage.getItem("user"));

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      alert("Please login first");
      navigate("/login"); // If no user found, redirect to login
     
    }
  }, [user, navigate]);

  // Prevent rendering if no user (during the redirect)
  if (!user) return <Home/>;
  
 
  return (
    <>
      
      
      {/* Content section with controlled width */}
     
        <Main />
        
     
    </>
  );
};

export default Dashboard;
