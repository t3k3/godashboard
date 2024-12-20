function ShippingListItem({ shippingMethod, handleShippingMethodEdit }) {
  return (
    <>
      <tr className='bg-white border-b  hover:bg-gray-200'>
        <th
          scope='row'
          className='flex items-center px-2 py-1 text-gray-900 whitespace-nowrap '
        >
          <div className='pl-3'>
            <div className='text-base font-semibold'>{shippingMethod.name}</div>
            <div className='font-normal text-gray-500'>
              <span className='text-xs'>{shippingMethod.name}</span>
            </div>
          </div>
        </th>

        <td className='px-6 py-1'>
          <span className='text-xs'>
            {/* <Image
              src={manufacturer.image}
              alt={manufacturer.name}
              width={50}
              height={50}
            ></Image> */}
          </span>
        </td>
        <td className='px-6 py-1'>
          <span className='text-xs'>{shippingMethod.price}</span>
        </td>
        <td className='px-6 py-1'>
          <span className='text-xs'>{shippingMethod.minimum_order_amount}</span>
        </td>
        <td className='px-6 py-1'>
          <span className='text-xs'>
            {shippingMethod.status ? 'Açık' : 'Kapalı'}
          </span>
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
                handleShippingMethodEdit(shippingMethod);
              }}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
              />
            </svg>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ShippingListItem;
