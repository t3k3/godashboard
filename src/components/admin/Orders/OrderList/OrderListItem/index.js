import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

function OrderListItem({ order }) {
  return (
    <tr className=' bg-white border-b-2 hover:bg-gray-200'>
      <td className='w-4 p-4'>
        <div className='flex items-center'>
          <input
            type='checkbox'
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
          />
          <label className='sr-only'>checkbox</label>
        </div>
      </td>
      <td className='w-4 p-4'>
        <div className='flex items-center'>#{order.order_id}</div>
      </td>
      <td className='w-4 p-4'>
        <div className='flex items-center'>
          <div className='sm:flex sm:items-center'>
            <div className=' flex items-center sm:mt-0 mt-1'>
              {order.order_product.map((order_prod) => {
                return (
                  <span
                    key={order_prod.order_product_id}
                    className='-ml-2.5 border-2 border-white rounded-full '
                  >
                    {/* {console.log(order_prod)} */}
                    {/* {order_prod.images.map((image) => {
                      console.log('image: ', image);
                      // return 1;
                      return (
                        <Link href={`/admin/urunler/${order_prod.product_id}`}>
                          <Image
                            className='w-8 h-8 rounded-full object-cover'
                            src={
                              image ||
                              'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
                            }
                            alt='avatar'
                            width={32}
                            height={32}
                          />
                        </Link>
                      );
                    })} */}
                    <Link href={`/admin/urunler/${order_prod.product_id}`}>
                      <Image
                        className='w-8 h-8 rounded-full object-cover'
                        src={
                          order_prod.image ||
                          'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
                        }
                        alt='avatar'
                        width={32}
                        height={32}
                      />
                    </Link>
                  </span>
                );
              })}{' '}
              <span
                className={`absolute w-6 h-6 -ml-6 mb-2 pl-1.5 border-2 border-white bg-blue-500 text-white rounded-full ${
                  order.product_total < 4 && 'hidden'
                } `}
              >
                {order.product_total}
              </span>
            </div>
          </div>
        </div>
      </td>
      <th
        scope='row'
        className='flex items-center px-2 py-8 text-gray-900 whitespace-nowrap '
      >
        <div className='pl-3'>
          <div className='text-base font-semibold'>{order.customer}</div>
          <div className='font-normal text-gray-500'>
            <span className='text-xs'>{order.telephone}</span>
          </div>
        </div>
      </th>

      <td className='px-6 py-4'>
        <span className='text-xs'>{order.date_added}</span>
      </td>

      <td className='px-6 py-4'>
        <div className='flex items-center'>
          <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>{' '}
          {order.order_status}
        </div>
      </td>
      <td className='px-6 py-4'>
        <div className='flex items-center font-bold'>
          ₺{Number(order.total).toFixed(2)}
        </div>
      </td>
      <td className='px-6 py-4'>
        {/* <!-- Modal toggle --> */}
        <div className='flex'>
          <a
            href='#'
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
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
              />
            </svg>
          </a>
          <Link
            href={`/admin/siparisler/${order.order_id}`}
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
  );
}

export default OrderListItem;