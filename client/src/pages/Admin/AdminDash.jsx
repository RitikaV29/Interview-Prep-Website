import React, { useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { Outlet } from 'react-router-dom';

export const AdminDash = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex w-full min-h-screen ">
      <AdminSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 ">
        {/* Mobile toggle button */}
        <button className="sm:hidden m-1 text-blue-600 text-xl" onClick={toggleSidebar}>
          ☰ Menu
        </button>

        {/* Show the current page content */}
        <Outlet />

    
      </div>
    </div>
  );
};
