'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';

function Header() {
  const [isOpen, toggleSidebar] = useState(false);

  return (
    <div className='h-screen'>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default Header;
