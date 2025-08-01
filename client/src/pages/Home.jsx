import React from 'react';
import Animation from '../components/Animation';
import Animation1 from '../assets/animation1.json';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const navigate=useNavigate();
  return <>

    <div className="flex  items-center flex-col w-full h-full">
     
      {/* Left Content Section */}
      <div className='mt-10 flex justify-center items-center h-full w-full'>
      <div className="max-w-xl flex flex-col items-start justify-center p-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Ace Your Interviews with Confidence
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Practice real interview questions — Technical, HR, and Behavioral — and get instant feedback powered by AI.
        </p>

        <div className="flex gap-4">
          <button onClick={()=>navigate("/register")}className="bg-[#4f46e5] text-white px-5 py-3 rounded-lg hover:bg-[#4338ca] transition">
            Get Started
          </button>
          <button onClick={()=>navigate("/about")} className="border border-[#4f46e5] text-[#4f46e5] px-5 py-3 rounded-lg hover:bg-[#e0e7ff] transition">
            About Us
          </button>
        </div>
      </div>

      {/* Right Animation */}
      <div className="max-w-md w-full mt-10 md:mt-0">
        <Animation animationData={Animation1} />
      </div>
      </div>

    </div>
  </>
};

export default Home;
