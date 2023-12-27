import Image from 'next/image';
function POSCartItem({ product }) {
  return (
    <div className=' w-full px-4 overflow-auto'>
      <div x-for='item in cart'>
        <div className='select-none mb-3 bg-gray-100 rounded-lg w-full text-gray-700 py-2 px-2 flex justify-center'>
          <Image
            src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
            alt=''
            width={40}
            height={40}
            className='rounded-lg h-10 w-10 bg-white shadow mr-2'
          />
          <div className='flex-grow'>
            <h5 className='text-sm'>{product.name}</h5>
            <p className='text-xs block'>
              ₺
              {Number(product.price).toLocaleString('tr-TR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className='py-1'>
            <div className='w-28 grid grid-cols-3 gap-2 ml-2'>
              <button className='rounded-lg text-center py-1 text-white bg-gray-600 hover:bg-gray-700 focus:outline-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-3 inline-block'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M20 12H4'
                  />
                </svg>
              </button>
              <input
                type='text'
                className='bg-white rounded-lg text-center shadow focus:outline-none focus:shadow-lg text-sm px-2'
                value={product.sold}
              />
              <button className='rounded-lg text-center py-1 text-white bg-gray-600 hover:bg-gray-700 focus:outline-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-3 inline-block'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default POSCartItem;
