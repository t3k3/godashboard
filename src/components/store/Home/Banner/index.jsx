import React from 'react';
import Link from 'next/link';

function Banner() {
  return (
    <div
      className='bg-cover bg-no-repeat bg-center py-36'
      style={{ backgroundImage: `url("/images/banner-bg.jpg")` }}
    >
      <div className='container'>
        <h1 className='text-6xl font-poppins text-gray-800 font-medium mb-4 capitalize'>
          Best collection for <br /> home decoration
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />{' '}
          Provident architecto dolores non saepe.
        </p>
        <div className='mt-12'>
          <Link
            href={'/kategori/koltuk'}
            className='bg-primary border border-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary transition'
          >
            Ürünler
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
