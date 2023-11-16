import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function AdSection() {
  return (
    <div className='container pb-16'>
      <Link href={'/urun/koltuk'}>
        <Image
          src={'/images/offer.jpg'}
          alt='offer'
          width={1000}
          height={250}
          className='w-full'
        ></Image>
      </Link>
    </div>
  );
}

export default AdSection;
