import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
 
  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser) {
      navigate("/admindash");
    }
  }, [navigate]);
  
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/auth/adminlogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Login successful") {
          console.log(data);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          alert(data.message);
          navigate("/admindash");
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-tr from-purple-600 to-purple-300 min-h-screen w-full p-4">
      <div className="flex flex-col md:flex-row w-3/4 md:w-2/4 shadow-xl rounded-xl overflow-hidden">
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-purple-800 text-white flex flex-col justify-center items-center p-6">
          <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back!</h2>
          <p className="text-sm text-center">
            Login to your account to get the best user experience and access all features.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8 bg-white">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Hello! Good Morning</h3>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              name="email"
              onChange={handleOnChange}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              name="password"
              onChange={handleOnChange}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-between text-sm">
              <Link to="#" className="text-purple-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-2 bg-purple-700 hover:bg-purple-800 text-white rounded-md transition-all"
            >
              Login
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
