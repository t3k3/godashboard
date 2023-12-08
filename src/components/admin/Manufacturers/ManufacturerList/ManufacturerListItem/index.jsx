import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

function ManufacturerListItem({
  manufacturer,
  handleDeleteManufacturer,
  handleManufacturerEdit,
}) {
  return (
    <>
      <tr className='bg-white border-b  hover:bg-gray-200'>
        <td className='w-4 p-4'>
          <div className='flex items-center'>#{manufacturer.ID}</div>
        </td>

        <th
          scope='row'
          className='flex items-center px-2 py-1 text-gray-900 whitespace-nowrap '
        >
          <div className='pl-3'>
            <div className='text-base font-semibold'>{manufacturer.name}</div>
            <div className='font-normal text-gray-500'>
              <span className='text-xs'>{manufacturer.name}</span>
            </div>
          </div>
        </th>

        <td className='px-6 py-1'>
          <span className='text-xs'>
            <Image
              src={manufacturer.image}
              alt={manufacturer.name}
              width={50}
              height={50}
            ></Image>
          </span>
        </td>
        <td className='px-6 py-1'>
          <span className='text-xs'>{manufacturer.sort_order}</span>
        </td>

        <td className='px-6 py-1'>
          {/* <!-- Modal toggle --> */}

          <div className='flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 font-medium text-blue-600  hover:underline cursor-pointer'
              onClick={() => {
                handleManufacturerEdit(manufacturer);
              }}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
              />
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='red'
              className='ml-6 w-6 h-6 font-medium text-blue-600  hover:underline cursor-pointer'
              onClick={() => {
                handleDeleteManufacturer(manufacturer.ID);
              }}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
              />
            </svg>

            {/* <Link
              href={`/admin/secenekler/${option.option_id}`}
              type='button'
              data-modal-target='editUserModal'
              data-modal-show='editUserModal'
              className='font-medium text-blue-600  hover:underline'
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
                  d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
                />
              </svg>
            </Link> */}
          </div>
        </td>
      </tr>
    </>
  );
}

export default ManufacturerListItem;
