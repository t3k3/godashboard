import React from 'react';
import Link from 'next/link';

function CategoryItem({ category }) {
  console.log();
  return (
    <>
      <tr className='bg-white border-b  hover:bg-gray-200'>
        <td className='w-4 p-4'>
          <div className='flex items-center'>#{category.ID}</div>
        </td>

        <th
          scope='row'
          className='flex items-center px-2 py-1 text-gray-900 whitespace-nowrap '
        >
          <div className='pl-3'>
            <div className='text-base font-semibold'>{category.name}</div>
            <div className='font-normal text-gray-500'>
              <span className='text-xs'>{category.path}</span>
            </div>
          </div>
        </th>

        <td className='px-6 py-1'>
          <span className='text-xs'>{category.parent_id}</span>
        </td>
        <td className='px-6 py-1'>
          <span className='text-xs'>elektronik</span>
        </td>

        {/* TODO: Kategori status editlenecek */}
        <td className='px-6 py-1'>
          <div className='flex items-center'>
            <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>{' '}
            Açık
          </div>
        </td>
        <td className='px-6 py-1'>
          {/* <!-- Modal toggle --> */}
          <div className='flex'>
            <Link
              href={`/admin/kategoriler/${category.ID}`}
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
            </Link>
          </div>
        </td>
      </tr>
    </>
  );
}

export default CategoryItem;
