import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function ProductWrapper({ wrapperName, products }) {
  if (products?.length === 0) {
    return (
      <div className='container py-16'>
        <h2 className='text-2xl font-medium font-roboto text-gray-800 uppercase pb-6'>
          Kategoride hiç ürün yok
        </h2>
      </div>
    );
  }

  return (
    <div className='container pb-16'>
      <h2 className='text-2xl font-medium font-roboto text-gray-800 uppercase pb-6'>
        {wrapperName}
      </h2>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6'>
        {/* SINGLE PRODUCT */}
        {products?.map((product) => {
          return (
            <div
              key={product?.ID}
              className='shadow bg-gray-50 hover:bg-white hover:border-1 border hover:scale-105 transition duration-300 rounded overflow-hidden group'
            >
              <div className='relative'>
                <Link href={`/urun/${product.keyword}`}>
                  {product?.product_options?.length > 0 && (
                    <div className='absolute px-2 py-1 bottom-0 right-0 inline-flex items-center justify-center bg-white rounded-md transform -translate-y-0 -translate-x-2'>
                      <div className='flex items-center justify-center w-5 h-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-2 border-white rounded-full '></div>
                      <div className='flex items-center justify-center w-5 h-5 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% border-2 border-white rounded-full transform -translate-x-2'></div>
                      <span className='text-sm font-medium'>
                        {product.product_options.length}
                      </span>
                    </div>
                  )}

                  <Image
                    src={`/${product?.product_images[0]?.image}`}
                    alt='product'
                    width={100}
                    height={100}
                    className='w-full'
                  ></Image>
                </Link>
              </div>
              <Link href={`/urun/${product.keyword}`}>
                <div className='pt-4 pb-3 sm:min-h-[8rem] px-4'>
                  <h4 className='uppercase font-medium text-md mb-2 text-gray-800 hover:text-primary transition'>
                    {product.name}
                  </h4>

                  <div className='flex items-baseline mb-1 space-x-2 font-roboto'>
                    {product.special ? (
                      <>
                        <p className='text-lg text-primary font-semibold'>
                          ₺
                          {product.price.toLocaleString('tr-TR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        <p className='text-sm text-gray-400 line-through'>
                          ₺{product.special}
                        </p>
                      </>
                    ) : (
                      <p className='text-lg text-primary font-semibold'>
                        ₺
                        {product.price.toLocaleString('tr-TR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    )}
                  </div>
                  <div className='flex items-center'>
                    <div className='flex gap-1 text-sm text-yellow-400'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='yellow'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-4 h-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                        />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='yellow'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-4 h-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                        />
                      </svg>

                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='yellow'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-4 h-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                        />
                      </svg>

                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='yellow'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-4 h-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                        />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-4 h-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                        />
                      </svg>
                    </div>
                    <div className='text-xs text-gray-500 ml-3'>(150)</div>
                  </div>
                </div>
              </Link>
              {/* <Link
                href={'#'}
                className='block mb-4 w-full rounded py-2 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition'
              >
                Sepete Ekle
              </Link> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductWrapper;
