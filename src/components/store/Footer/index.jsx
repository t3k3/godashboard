import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { _BASE_URL } from '@/config/apiConfig';

function Footer({ footerData, logo = '' }) {
  return (
    <>
      <footer className='bg-white pt-16 pb-12 border-t border-gray-100 '>
        <div className='container grid sm:grid-cols-3'>
          <div className='col-span-1 space-y-8'>
            <Image src={`/${logo}`} alt='logo' width={128} height={23}></Image>

            <p className='text-gray-500'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className='flex space-x-6'>
              <Link
                href={footerData?.footer_facebook}
                className='text-gray-400 hover:text-gray-500'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z' />
                </svg>
              </Link>
              <Link
                href={footerData?.footer_instagram}
                className='text-gray-400 hover:text-gray-500'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                </svg>
              </Link>
              <Link
                href={footerData?.footer_twitter}
                className='text-gray-400 hover:text-gray-500'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-.139 9.237c.209 4.617-3.234 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.08-4.03 3.199-4.03.943 0 1.797.398 2.395 1.037.748-.147 1.451-.42 2.086-.796-.246.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.439.656-.996 1.234-1.639 1.697z' />
                </svg>
              </Link>
              <Link
                href={footerData?.footer_youtube}
                className='text-gray-400 hover:text-gray-500'
              >
                <svg
                  fill='#000000'
                  height='24'
                  width='24'
                  viewBox='-271 311.2 256 179.8'
                >
                  <path
                    d='M-59.1,311.2h-167.8c0,0-44.1,0-44.1,44.1v91.5c0,0,0,44.1,44.1,44.1h167.8c0,0,44.1,0,44.1-44.1v-91.5
             C-15,355.3-15,311.2-59.1,311.2z M-177.1,450.3v-98.5l83.8,49.3L-177.1,450.3z'
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className='col-span-2 grid sm:grid-cols-2 gap-8'>
            <div className='grid grid-cols-2 gap-8'>
              <div>
                <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>
                  Çözümler
                </h3>
                <div className='mt-4 space-y-4'>
                  <Link
                    href={'#'}
                    className='text-base text-gray-500 hover:text-gray-900 block'
                  >
                    Pazarlama
                  </Link>
                  <Link
                    href={'#'}
                    className='text-base text-gray-500 hover:text-gray-900 block'
                  >
                    Analiz
                  </Link>
                  <Link
                    href={'#'}
                    className='text-base text-gray-500 hover:text-gray-900 block'
                  >
                    Ticaret
                  </Link>
                  <Link
                    href={'#'}
                    className='text-base text-gray-500 hover:text-gray-900 block'
                  >
                    Reklam
                  </Link>
                </div>
              </div>
              <div>
                <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>
                  Destek
                </h3>
                <div className='mt-4 space-y-4'>
                  <Link
                    href={'#'}
                    className='text-base text-gray-500 hover:text-gray-900 block'
                  >
                    Ücretler
                  </Link>
                  <Link
                    href={'#'}
                    className='text-base text-gray-500 hover:text-gray-900 block'
                  >
                    Dokümanlar
                  </Link>
                  <Link
                    href={'#'}
                    className='text-base text-gray-500 hover:text-gray-900 block'
                  >
                    Rehber
                  </Link>
                  <Link
                    href={'#'}
                    className='text-base text-gray-500 hover:text-gray-900 block'
                  >
                    API Status
                  </Link>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-8'>
              <div>
                <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>
                  Çözümler
                </h3>
                <div className='mt-4 space-y-4'>
                  <Link
                    href={'#'}
                    className='text-base text-gray-500 hover:text-gray-900 block'
                  >
                    Pazarlama
                  </Link>
                  <Link
                    href={'#'}
                    className='text-base text-gray-500 hover:text-gray-900 block'
                  >
                    Analiz
                  </Link>
                  <Link
                    href={'#'}
                    className='text-base text-gray-500 hover:text-gray-900 block'
                  >
                    Ticaret
                  </Link>
                  <Link
                    href={'#'}
                    className='text-base text-gray-500 hover:text-gray-900 block'
                  >
                    Reklam
                  </Link>
                </div>
              </div>
              <div>
                <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>
                  Destek
                </h3>
                <div className='mt-4 space-y-4'>
                  <Link
                    href={'#'}
                    className='text-base text-gray-500 hover:text-gray-900 block'
                  >
                    Ücretler
                  </Link>
                  <Link
                    href={'#'}
                    className='text-base text-gray-500 hover:text-gray-900 block'
                  >
                    Dokümanlar
                  </Link>
                  <Link
                    href={'#'}
                    className='text-base text-gray-500 hover:text-gray-900 block'
                  >
                    Rehber
                  </Link>
                  <Link
                    href={'#'}
                    className='text-base text-gray-500 hover:text-gray-900 block'
                  >
                    API Status
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className='bg-gray-800 py-4'>
        <div
          className='container sm:flex items-center justify-between
        '
        >
          <p className='text-white'>
            ACT BİLGİ TEKNOLOJİLERİ - Tüm Hakları Saklıdır
          </p>

          <Image
            src={'/images/methods.png'}
            alt='payment-methods'
            width={395}
            height={56}
            className='h-8'
          ></Image>
        </div>
      </div>
    </>
  );
}

export default Footer;
