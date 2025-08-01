import React from 'react';
import Navbar from '../components/Navbar';
import img from '../assets/img.jpg';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="flex flex-col bg-white text-gray-800 min-h-screen w-full">
      

      <div className= " mt-16 flex flex-col md:flex-row items-center justify-between w-full h-full p-8 gap-10">
        {/* Left Content */}
        <div className="  w-full md:w-1/2shadow-lg rounded-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">ABOUT US</h1>

          <p className="text-sm md:text-lg leading-relaxed mb-2">
            <i>
              Welcome to <strong>AceMyInterview</strong> — a smart and simple platform to help you get better at interviews.
            </i>
          </p>

          <p className="text-sm md:text-lg leading-relaxed mb-2">
            <i>
              We provide a curated set of <strong>HR</strong>, <strong>technical</strong>, and <strong>behavioral interview questions</strong> to help you practice confidently.
            </i>
          </p>

          <p className="text-sm md:text-lg leading-relaxed mb-2">
            <i>
              After each answer, our <strong>AI gives instant feedback</strong>, so you know what’s working and what needs improvement.
            </i>
          </p>

          <p className="text-sm md:text-lg leading-relaxed mb-4">
            <i>
              Whether you're a beginner or just brushing up before your next interview, we're here to make your prep smoother and smarter.
            </i>
          </p>

          <div className="flex justify-center md:justify-start">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition duration-200">
              Get Started
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden md:flex w-full md:w-1/2  justify-center">
          <img src={img} alt="ABOUT US" className="  w-64 md:w-96 h-auto object-contain" />
        </div>
      </div>
      {/* Footer Section */}
     
    </div>
  );
};

export default About;
