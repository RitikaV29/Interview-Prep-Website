import React, { useState } from "react";

const Registeration = () => {
  const [data, setData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User registered") {
          alert("User registered");
        } else {
          alert("error registering");
        }
      });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-purple-700 p-4">
      <div className="flex flex-col w-3/4 md:flex-row md:w-2/4 rounded-xl shadow-lg overflow-hidden">
        
        {/* Left Panel */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-600 to-purple-800 text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-2xl font-bold">Create an Account</h2>
          <p className="text-sm mt-2 text-center">
            Join now to start practicing interviews!
          </p>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8  bg-white">
          <h3 className="text-xl font-semibold mb-4 text-center md:text-left">Welcome!</h3>
          <form onSubmit={handleRegister} className="flex flex-col space-y-4">
            <input
              name="name"
              type="text"
              onChange={handleOnChange}
              placeholder="Name"
              className="p-2 border rounded"
            />
            <input
              name="username"
              type="text"
              onChange={handleOnChange}
              placeholder="Username"
              className="p-2 border rounded"
            />
            <input
              name="password"
              type="password"
              onChange={handleOnChange}
              placeholder="Password"
              className="p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-purple-700 text-white py-2 rounded hover:bg-purple-800"
            >
              Register
            </button>
          </form>
          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-purple-700 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registeration;
