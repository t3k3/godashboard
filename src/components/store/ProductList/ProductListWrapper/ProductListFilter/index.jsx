import React from 'react';
import Link from 'next/link';

function ProductListFilter({ categories }) {
  return (
    <div className='col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden'>
      <div className='divide-y divide-gray-200 space-y-5'>
        {/* CATEGORY FILTER */}
        <div>
          <h3 className='text-md text-gray-800 mb-3 uppercase font-medium'>
            kategoriler
          </h3>
          <div className='space-y-2'>
            {categories?.map((category) => {
              return (
                <div key={category.category_id} className='flex items-center'>
                  <input
                    type='checkbox'
                    name='cat-1'
                    id='cat-1'
                    className='text-primary focus:ring-0 rounded-sm cursor-pointer'
                  />
                  <label
                    htmlFor='cat-1'
                    className='text-gray-600 ml-3 cursor-pointer'
                  >
                    {category.name}
                  </label>
                  <div className='ml-auto text-gray-600 text-sm'>(12)</div>
                </div>
              );
            })}
          </div>
        </div>
        {/* CATEGORY FILTER END*/}

        {/* CATEGORY FILTER */}
        <div className='pt-4'>
          <h3 className='text-md text-gray-800 mb-3 uppercase font-medium'>
            markalar
          </h3>
          <div className='space-y-2'>
            {/* SINGLE FILTER */}
            <div className='flex items-center'>
              <input
                type='checkbox'
                name='cat-5'
                id='cat-5'
                className='text-primary focus:ring-0 rounded-sm cursor-pointer'
              />
              <label
                htmlFor='cat-5'
                className='text-gray-600 ml-3 cursor-pointer'
              >
                Yataş
              </label>
              <div className='ml-auto text-gray-600 text-sm'>(12)</div>
            </div>
            {/* SINGLE FILTER END */}
            {/* SINGLE FILTER */}
            <div className='flex items-center'>
              <input
                type='checkbox'
                name='cat-6'
                id='cat-6'
                className='text-primary focus:ring-0 rounded-sm cursor-pointer'
              />
              <label
                htmlFor='cat-6'
                className='text-gray-600 ml-3 cursor-pointer'
              >
                İstikbal
              </label>
              <div className='ml-auto text-gray-600 text-sm'>(21)</div>
            </div>
            {/* SINGLE FILTER END */}
            {/* SINGLE FILTER */}
            <div className='flex items-center'>
              <input
                type='checkbox'
                name='cat-7'
                id='cat-7'
                className='text-primary focus:ring-0 rounded-sm cursor-pointer'
              />
              <label
                htmlFor='cat-7'
                className='text-gray-600 ml-3 cursor-pointer'
              >
                Bellona
              </label>
              <div className='ml-auto text-gray-600 text-sm'>(18)</div>
            </div>
            {/* SINGLE FILTER END */}
            {/* SINGLE FILTER */}
            <div className='flex items-center'>
              <input
                type='checkbox'
                name='cat-8'
                id='cat-8'
                className='text-primary focus:ring-0 rounded-sm cursor-pointer'
              />
              <label
                htmlFor='cat-8'
                className='text-gray-600 ml-3 cursor-pointer'
              >
                Kelebek
              </label>
              <div className='ml-auto text-gray-600 text-sm'>(28)</div>
            </div>
            {/* SINGLE FILTER END */}
          </div>
        </div>
        {/* CATEGORY FILTER END*/}

        {/* PRICE FILTER*/}
        <div className='pt-4'>
          <h3 className='text-md text-gray-800 mb-3 uppercase font-medium'>
            Fiyat
          </h3>
          <div className='mt-4 flex items-center'>
            <input
              type='text'
              name=''
              id=''
              className='w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded'
              placeholder='min'
            />
            <span className='mx-3 text-gray-500'>-</span>
            <input
              type='text'
              name=''
              id=''
              className='w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded'
              placeholder='max'
            />
          </div>
        </div>
        {/* PRICE FILTER END*/}

        {/* SIZE FILTER*/}
        <div className='pt-4'>
          <h3 className='text-md text-gray-800 mb-3 uppercase font-medium'>
            Beden
          </h3>
          <div className='flex items-center gap-2'>
            {/* SINGLE SIZE */}
            <div className='size-selector'>
              <input type='radio' name='size' id='size-xs' className='hidden' />
              <label
                htmlFor='size-xs'
                className='text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600'
              >
                XS
              </label>
            </div>
            {/* SINGLE SIZE END */}
            {/* SINGLE SIZE */}
            <div className='size-selector'>
              <input type='radio' name='size' id='size-s' className='hidden' />
              <label
                htmlFor='size-s'
                className='text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600'
              >
                S
              </label>
            </div>
            {/* SINGLE SIZE END */}
            {/* SINGLE SIZE */}
            <div className='size-selector'>
              <input type='radio' name='size' id='size-m' className='hidden' />
              <label
                htmlFor='size-m'
                className='text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600'
              >
                M
              </label>
            </div>
            {/* SINGLE SIZE END */}
            {/* SINGLE SIZE */}
            <div className='size-selector'>
              <input type='radio' name='size' id='size-l' className='hidden' />
              <label
                htmlFor='size-l'
                className='text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600'
              >
                L
              </label>
            </div>
            {/* SINGLE SIZE END */}
            {/* SINGLE SIZE */}
            <div className='size-selector'>
              <input type='radio' name='size' id='size-xl' className='hidden' />
              <label
                htmlFor='size-xl'
                className='text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600'
              >
                XL
              </label>
            </div>
            {/* SINGLE SIZE END */}
          </div>
        </div>
        {/* SIZE FILTER END*/}

        {/* COLOR FILTER */}

        <div className='pt-4'>
          <h3 className='text-md text-gray-800 mb-3 uppercase font-medium'>
            RENK
          </h3>
          <div className='flex items-center gap-2'>
            {/* SINGLE COLOR */}
            <div className='color-selector'>
              <input
                type='radio'
                name='color'
                id='color-red'
                className='hidden'
              />
              <label
                htmlFor='color-red'
                className='border border-gray-200 rounded-sm h-5 w-5 cursor-pointer shadow-sm block'
                style={{ backgroundColor: '#fc3d57' }}
              ></label>
            </div>
            {/* SINGLE COLOR END */}
            {/* SINGLE COLOR */}
            <div className='color-selector'>
              <input
                type='radio'
                name='color'
                id='color-white'
                className='hidden'
              />
              <label
                htmlFor='color-white'
                className='border border-gray-200 rounded-sm h-5 w-5 cursor-pointer shadow-sm block'
                style={{ backgroundColor: '#fff' }}
              ></label>
            </div>
            {/* SINGLE COLOR END */}
            {/* SINGLE COLOR */}
            <div className='color-selector'>
              <input
                type='radio'
                name='color'
                id='color-black'
                className='hidden'
              />
              <label
                htmlFor='color-black'
                className='border border-gray-200 rounded-sm h-5 w-5 cursor-pointer shadow-sm block'
                style={{ backgroundColor: '#000' }}
              ></label>
            </div>
            {/* SINGLE COLOR END */}
          </div>
        </div>

        {/* COLOR FILTER END*/}
        <Link
          href={'#'}
          className='block mb-4 w-full rounded py-2 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition'
        >
          Ürünleri Filtrele
        </Link>
      </div>
    </div>
  );
}

export default ProductListFilter;
