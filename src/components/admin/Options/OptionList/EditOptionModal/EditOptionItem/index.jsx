import React from 'react';
import { useState } from 'react';
import Image from 'next/image';

function EditOptionItem({
  index,
  option_item,
  handleOptionValueChange,
  handleDeleteOptionValue,
}) {
  return (
    <>
      <tr className={` border-b bg-gray-50`}>
        <th
          scope='row'
          className='flex items-center py-1 my-1 text-gray-600 whitespace-nowrap'
        >
          <div className=''>
            <div className='flex items-center py-2 '>
              <input
                type='text'
                name='name'
                value={option_item.option_value_description[5].name}
                onChange={(e) => {
                  handleOptionValueChange(e, index);
                }}
                className={` block px-6 w-42 rounded-md border-0 py-2.5 text-lg  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              />
            </div>
          </div>
        </th>

        <td className='px-4 py-1'>
          <span className='text-xs'>
            <div className='relative my-1 rounded-md shadow-sm'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'></div>
              {option_item.image != '' ? (
                <Image
                  src={option_item.image}
                  alt='image'
                  width={64}
                  height={64}
                ></Image>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className={`w-16 h-16 mr-1 border border-gray-400 border-dashed cursor-pointer`}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                  />
                </svg>
              )}
              <input type='file' name='image' />
            </div>
          </span>
        </td>

        <td className='py-2'>
          <span
            className='cursor-pointer w-12 h-12 bg-red-400 px-4 py-3 rounded-lg hover:bg-red-600 text-xl text-white'
            onClick={() => handleDeleteOptionValue(index)}
          >
            Sil
          </span>
          <svg viewBox='0 0 24 24' fill='currentColor' height='4em' width='4em'>
            <path d='M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12 6.47 2 12 2m5 5h-2.5l-1-1h-3l-1 1H7v2h10V7M9 18h6a1 1 0 001-1v-7H8v7a1 1 0 001 1z' />
          </svg>
        </td>
      </tr>
    </>
  );
}

export default EditOptionItem;
