'use client';
import React from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';

function AccountMenu({ user_id, firstname }) {
  const router = useRouter();

  const logoutHandle = async () => {
    console.log('logoutHandle');
    var requestOptions = {
      method: 'POST',
    };

    const response = await fetch(`/api/account/logout`, requestOptions);

    const res = await response.json();

    // console.log('RES: ', res);
    if (res.status == 200) {
      router.refresh();
      router.refresh();
      router.push('/');
    }
  };

  return (
    <div>
      {user_id === 0 ? (
        <Link href={'/uyelik'}>
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
              d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
            />
          </svg>
          <div className='text-xs leading-3'>Hesap</div>
        </Link>
      ) : (
        <Menu as='div' className='relative z-20'>
          {({ open }) => (
            <>
              <Menu.Button className='text-center text-gray-700 hover:text-primary transition'>
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
                    d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                  />
                </svg>
                <div className='text-xs leading-3'>Hesap</div>
              </Menu.Button>
              <Transition
                show={open}
                as='div'
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items
                  // static
                  // className='origin-top-right z-50 absolute right-0 mt-2 w-52 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                  className='absolute z-50 -right-12 sm:right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                >
                  {user_id > 0 && (
                    <div className='py-2 px-3'>
                      <h3 className='text-center mt-1 text-gray-600 font-medium'>
                        Hoşgeldiniz!
                      </h3>
                      {/* <div className='flex items-center justify-center my-3 gap-3'>
                        <Link
                          href='/uyelik'
                          className='w-full bg-primary py-1 px-4 text-white rounded uppercase border border-primary text-sm text-center inline-block'
                        >
                          Kayıt
                        </Link>
                        <Link
                          href='/uyelik'
                          className='w-full bg-white py-1 px-4 text-primary rounded uppercase border border-primary text-sm text-center inline-block'
                        >
                          giriş
                        </Link>
                      </div> */}
                      <div className='flex items-center justify-center'>
                        <p className='w-full text-gray-700 font-bold  text-sm text-center inline-block'>
                          {firstname}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className='py-2'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href='/hesap'
                          className='group hover:bg-gray-100 text-gray-600 flex items-center w-full px-3 py-2 text-sm transition duration-300'
                        >
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
                              d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                          </svg>
                          <span className='mx-1'>Hesabım</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href='/hesap/siparisler'
                          className='group hover:bg-gray-100 text-gray-600 flex items-center w-full px-3 py-2 text-sm transition duration-300'
                        >
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
                              d='M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
                            />
                          </svg>
                          <span className='mx-1'>Siparişlerim</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href='/hesap/favoriler'
                          className='group hover:bg-gray-100 text-gray-600 flex items-center w-full px-3 py-2 text-sm transition duration-300'
                        >
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
                              d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                            />
                          </svg>

                          <span className='mx-1'>Favorilerim</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href='/sepet'
                          className='group hover:bg-gray-100 text-gray-600 flex items-center w-full px-3 py-2 text-sm transition duration-300'
                        >
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
                              d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                            />
                          </svg>

                          <span className='mx-1'>Sepetim</span>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  {user_id > 0 && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className='group hover:bg-gray-100 text-gray-600 flex items-center w-full px-3 py-2 text-sm transition duration-300'
                          onClick={() => logoutHandle()}
                        >
                          Çıkış Yap
                        </button>
                      )}
                    </Menu.Item>
                  )}
                  {/* <Menu.Item>
             {({ active }) => (
               <>
                 <Link href='/account'>
                   <a
                     className={
                       'block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100'
                     }
                   >
                     My Account
                   </a>
                 </Link>
                 <Link href='/account/orders'>
                   <a
                     className={
                       'block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100'
                     }
                   >
                     My Order
                   </a>
                 </Link>
                 <Link href='/account/wishlist'>
                   <a
                     className={
                       'block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100'
                     }
                   >
                     My Wishlist
                   </a>
                 </Link>
                 <Link href='/cart'>
                   <a
                     className={
                       'block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100'
                     }
                   >
                     My Cart
                   </a>
                 </Link>
                 <button
                   className={
                     'block focus:outline-none px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100'
                   }
                 >
                   Log out
                 </button>
               </>
             )}
           </Menu.Item> */}
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      )}
    </div>
  );
}

export default AccountMenu;
