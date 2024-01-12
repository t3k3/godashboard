import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Navbar({ categoryList, headerData }) {
  return (
    <nav className='bg-gray-800 sticky top-0 z-10'>
      <div className='container flex'>
        {/* all categories */}
        <div className='px-8 py-4 bg-primary flex items-center cursor-pointer relative group '>
          <span className='text-white'>
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
          </span>
          <span className='capitalize ml-2 text-white'>Tum Kategoriler</span>
          <div className=' absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed hidden group-hover:block'>
            {categoryList.map((category) => {
              return (
                <Link
                  key={category.ID}
                  href={`/kategori/${category.keyword}`}
                  className='flex items-center px-6 py-3 hover:bg-gray-100 transition'
                >
                  <Image
                    src={'/images/icons/bed.svg'}
                    alt='bed-icon'
                    className='w-5 h-5 object-contain'
                    width={20}
                    height={20}
                  ></Image>
                  <span className='ml-6 text-gray-600 text-sm'>
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        {/* navbar links */}
        <div className='items-center justify-between flex-grow pl-12 hidden sm:flex'>
          <div className='flex items-center space-x-6 capitalize'>
            <Link
              href={'/'}
              className='text-gray-200 hover:text-white transition'
            >
              Markalar
            </Link>
            <Link
              href={'/kategori/koltuk'}
              className='text-gray-200 hover:text-white transition'
            >
              Ürünler
            </Link>
          </div>
          {headerData.header_user_id > 0 ? (
            <div className='flex items-center space-x-6 capitalize text-white'>
              Hoşgeldiniz {headerData.header_user_firstname}!
            </div>
          ) : (
            <Link
              href={'/uyelik'}
              className='text-gray-200 hover:text-white transition'
            >
              Giriş Yap / Üye Ol
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
