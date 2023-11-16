import React from 'react';
import Image from 'next/image';

function Feature() {
  return (
    <div className='container py-16'>
      <div className='w-10/12 grid sm:grid-cols-3 gap-6 mx-auto justify-center'>
        <div className='flex border border-primary rounded-sm px-3 py-6 justify-center items-center gap-5'>
          <Image
            src={'/images/icons/delivery-van.svg'}
            alt='delivery-van-icon'
            width={49}
            height={35}
            className='w-12 h-12 object-contaın'
          ></Image>
          <div>
            <h4 className='font-medium capitalize text-lg'>Ücretsiz Kargo</h4>
            <p className='text-gray-500 text-sm'>₺500 ve üzerine</p>
          </div>
        </div>
        <div className='border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5'>
          <Image
            src={'/images/icons/delivery-van.svg'}
            alt='delivery-van-icon'
            width={49}
            height={35}
            className='w-12 h-12 object-contaın'
          ></Image>
          <div>
            <h4 className='font-medium capitalize text-lg'>Ücretsiz Kargo</h4>
            <p className='text-gray-500 text-sm'>₺500 ve üzerine</p>
          </div>
        </div>
        <div className='border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5'>
          <Image
            src={'/images/icons/delivery-van.svg'}
            alt='delivery-van-icon'
            width={49}
            height={35}
            className='w-12 h-12 object-contaın'
          ></Image>
          <div>
            <h4 className='font-medium capitalize text-lg'>Ücretsiz Kargo</h4>
            <p className='text-gray-500 text-sm'>₺500 ve üzerine</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;
