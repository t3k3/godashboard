'use client';

import useStore from '@/zustand_stores/cart_store';
import Link from 'next/link';

function Favoriler() {
  const counter = useStore((state) => state.counter);

  return (
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
        {counter}
      </span>
    </Link>
  );
}

export default Favoriler;
