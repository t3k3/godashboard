'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import { FiMenu } from 'react-icons/fi';

function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = (open) => {
    setSidebarOpen(open);
  };

  return (
    // <div className='sticky top-0 z-50 '>
    <div className='h-screen relative'>
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-10'
          onClick={() => toggleSidebar(false)}
        />
      )}
      <button
        className={`lg:hidden top-0 left-0 m-4 z-20`}
        onClick={() => toggleSidebar(!isSidebarOpen)}
      >
        <FiMenu size={36} />
      </button>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default Header;
