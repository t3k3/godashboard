import React from 'react';
import Image from 'next/image';

function Nav() {
  return (
    <div className={`flex flex-col flex-shrink-0 fixed w-full z-31`}>
      <header className='flex flex-col border-b px-6 border-gray-200'>
        <div className='flex justify-between items-center py-3'>
          <div className='flex items-center py-3'>
            {/* Hamburger Menu */}
            {/* <button className='text-gray-600 lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button> */}
            {/* Search Bar */}
            {/* <div className='ml-4 lg:ml-0 relative w-64'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 text-gray-500'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </span>
              <input
                className='block w-full text-sm border border-gray-400 rounded-md py-2 pl-10 pr-4 placeholder-gray-400'
                placeholder='Search'
              />
            </div> */}
          </div>

          {/* Icons */}
          <div className='ml-4 flex-shrink-0 flex items-center'>
            <button className='flex-shrink-0 w-6 h-6 text-gray-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                />
              </svg>
            </button>
            <button className='ml-6'>
              <Image
                className='w-9 h-9 rounded-full object-cover'
                src='https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=144&h=144&q=80'
                alt='profile1'
                width={36}
                height={36}
              />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Nav;
