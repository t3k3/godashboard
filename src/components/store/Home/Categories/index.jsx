import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Categories() {
  return (
    <div className='container py-16'>
      <h2 className='text-3xl font-roboto font-medium text-gray-800 uppercase mb-6'>
        kategoriler
      </h2>
      <div className='grid grid-cols-3 gap-3'>
        <div className='relative rounded-sm overflow-hidden group'>
          <Image
            src={'/images/category/category-1.jpg'}
            alt='bedroom'
            width={200}
            height={200}
            className='w-full'
          ></Image>
          <Link
            href={'/kategori/koltuk'}
            className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-50 transition'
          >
            {' '}
            Yatak Odası
          </Link>
        </div>
        <div className='relative rounded-sm overflow-hidden group'>
          <Image
            src={'/images/category/category-2.jpg'}
            alt='mattress'
            width={200}
            height={200}
            className='w-full'
          ></Image>
          <Link
            href={'/kategori/koltuk'}
            className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-50 transition'
          >
            {' '}
            Genç Odası
          </Link>
        </div>
        <div className='relative rounded-sm overflow-hidden group'>
          <Image
            src={'/images/category/category-3.jpg'}
            alt='office'
            width={200}
            height={200}
            className='w-full'
          ></Image>
          <Link
            href={'/kategori/koltuk'}
            className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-50 transition'
          >
            {' '}
            Ofis Mobilyası
          </Link>
        </div>
        <div className='relative rounded-sm overflow-hidden group'>
          <Image
            src={'/images/category/category-4.jpg'}
            alt='outdoor'
            width={200}
            height={200}
            className='w-full'
          ></Image>
          <Link
            href={'/kategori/koltuk'}
            className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-50 transition'
          >
            {' '}
            Dış Mekan
          </Link>
        </div>
        <div className='relative rounded-sm overflow-hidden group'>
          <Image
            src={'/images/category/category-5.jpg'}
            alt='sofa'
            width={200}
            height={200}
            className='w-full'
          ></Image>
          <Link
            href={'/kategori/koltuk'}
            className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-50 transition'
          >
            {' '}
            Koltuk
          </Link>
        </div>
        <div className='relative rounded-sm overflow-hidden group'>
          <Image
            src={'/images/category/category-6.jpg'}
            alt='dining'
            width={200}
            height={200}
            className='w-full'
          ></Image>
          <Link
            href={'/kategori/koltuk'}
            className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-50 transition'
          >
            {' '}
            Oturma Odası
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Categories;
