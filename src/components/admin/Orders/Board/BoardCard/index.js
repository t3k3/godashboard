import React from 'react';
import Image from 'next/image';

function BoardCard() {
  return (
    <li className='mt-1'>
      <a href='#' className='block  p-5 rounded-md bg-white shadow'>
        <div>
          <div className='flex justify-between items-baseline'>
            <div className='px-3 py-1 bg-purple-200 rounded'>
              <span className='text-sm font-medium text-purple-500 leading-tight'>
                ALİ KUŞCU
              </span>
            </div>
            <div className='flex items-center text-sm text-gray-400'>
              <span className='ml-2'>#2222</span>
            </div>
          </div>
          <div className='mt-3'>
            <p className='text-sm text-gray-800'>
              Dandanakan Sokak 1. Cadde 123/A MERKEZ / BURDUR
            </p>
          </div>
          <div className='mt-3 flex justify-between items-center'>
            <div className=' flex items-center'>
              <span className='border-2 border-white rounded-full'>
                <Image
                  className='w-6 h-6 rounded-full object-cover'
                  src='https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=144&h=144&q=80'
                  alt='avatar'
                  width={24}
                  height={24}
                />
              </span>
              <span className='-ml-2.5 border-2 border-white rounded-full '>
                <Image
                  className='w-6 h-6 rounded-full object-cover'
                  src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=144&h=144&q=80'
                  alt='avatar'
                  width={24}
                  height={24}
                />
              </span>
              <span className='-ml-2.5 border-2 border-white rounded-full '>
                <Image
                  className='w-6 h-6 rounded-full object-cover'
                  src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=144&h=144&q=80'
                  alt='avatar'
                  width={24}
                  height={24}
                />
              </span>
            </div>
            <span className='text-sm text-gray-500'>₺5750,00</span>
          </div>
        </div>
      </a>
    </li>
  );
}

export default BoardCard;
