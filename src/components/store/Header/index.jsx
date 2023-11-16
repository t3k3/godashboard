import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AccountMenu from './AccountMenu';

function Header({ headerData }) {
  return (
    <header className='py-4 shadow-sm bg-white'>
      <div className='container sm:flex items-center justify-between '>
        {/* logo */}
        <Link href={'/'}>
          <Image
            src={headerData?.logo}
            alt='logo'
            width={128}
            height={23}
          ></Image>
        </Link>
        {/* searchbar */}
        <div className='flex w-full max-w-xl relative mr-4 mt-4'>
          <span className='absolute left-4 top-3 text-lg text-gray-400'>
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
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </span>
          <input
            type='text'
            className='w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-md focus:outline-none'
            placeholder='ara'
          />
          <Link href={'kategori/koltuk'}>
            <button className='bg-primary border border-primary py-3 text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition'>
              Ara
            </button>
          </Link>
        </div>
        {/* icon */}
        <div className='flex  items-center space-x-4 mt-4'>
          <Link
            href={'#'}
            className='text-center text-gray-700 hover:text-primary transition relative'
          >
            <div className='text-2xl'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-10 h-10'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                />
              </svg>
            </div>
            <div className='-ml-0.5 text-xs leading-3'>Favoriler</div>
            <span className='absolute right-1 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs'>
              5
            </span>
          </Link>
          <Link
            href={'/sepet'}
            className='text-center text-gray-700 hover:text-primary transition relative'
          >
            <div className='text-2xl'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-10 h-10'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                />
              </svg>
            </div>
            <div className='text-xs leading-3'>Sepet</div>

            <span className='absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs'>
              {headerData.text_items}
            </span>
          </Link>

          <AccountMenu
            user={{
              user_id: headerData.logged,
              firstname: headerData.firstname,
              lastname: headerData.lastname,
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
