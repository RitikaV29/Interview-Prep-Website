import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
 const handleShowQuestion=(category)=>{
     navigate(`/question/${category}`);
 }
  const categories = [
    {
      title: "Technical Round",
      category:"technical",
      desc: "Practice DSA, coding and technical questions",
      color: "bg-blue-100"
     
    },
    {
      title: "HR Round",
       category:"hr",
      desc: "Prepare for behavioral and soft skills questions",
      color: "bg-yellow-100"
    
    },
    {
      title: "Behavioural Round",
       category:"behavioural",
      desc: "Prepare for behavioral and soft skills questions",
      color: "bg-green-100"
     
    }
    // {
    //   title: "Ask Gemini (AI)",
    //   desc: "Let AI help you prepare smarter!",
    //   color: "bg-purple-100",
    //   path: "/chat",
    // },
  ];

  return (
 
      
      <div className="pt-20 w-full max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">Choose Your Practice Area</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`${cat.color} rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer`}
              onClick={() =>handleShowQuestion(cat.category)}
            >
              <h3 className="text-xl font-bold mb-2 text-gray-800">{cat.title}</h3>
              <p className="text-gray-700 text-sm">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    
  );
};

export default Main;
