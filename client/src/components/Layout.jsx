// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className=" w-full flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-10"> {/* pt-16 to offset fixed navbar height */}
      <Outlet/>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
