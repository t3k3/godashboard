'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// import { getCategoryProducts } from '@/services/category';

import Link from 'next/link';
import CategoryDataEditModal from '@/components/admin/Modals/Category/CategoryDataEditModal';
import CategoryMetaEditModal from '@/components/admin/Modals/Category/CategoryMetaEditModal';

function Category(props) {
  const [category, setCategory] = useState(props.category);
  const [categoryDataEditModal, setCategoryDataEditModal] = useState(false);
  const [categoryMetaEditModal, setCategoryMetaEditModal] = useState(false);

  const [categoryProductsState, setCategoryProductsState] = useState(false);

  console.log('category1423: ', category);

  // if (category.ID == 'null') {
  //   console.log('Kategori bulunamadı.');
  // }

  // useEffect(() => {
  //   async function getCategoryProductsHandle() {
  //     const categoryProducts = await getCategoryProducts(category.KategoriId);
  //     setCategoryProductsState(categoryProducts);
  //   }
  //   getCategoryProductsHandle();
  // }, []);

  return (
    <div className='mx-8'>
      {/* CATEGORY DATA EDIT MODAL */}
      {categoryDataEditModal ? (
        <CategoryDataEditModal
          category={category}
          setCategory={setCategory}
          closeModal={setCategoryDataEditModal}
        />
      ) : null}

      {/* PRODUCT META EDIT MODAL */}
      {categoryMetaEditModal ? (
        <CategoryMetaEditModal
          category={category}
          setCategory={setCategory}
          closeModal={setCategoryMetaEditModal}
        />
      ) : null}

      {/* PRODUCT TRENDYOL EDIT MODAL */}
      {/* {productTrendyolEditModal ? (
        <CategoryTrendyolEditModal
          product={product.urunId}
          closeModal={setProductTrendyolEditModal}
        />
      ) : null} */}

      {/* Top Nav */}
      <div className='flex items-center justify-between py-2'>
        <div className='sm:flex sm:items-center mx-4'>
          <h2 className='text-lg font-medium text-gray-900'>Kategori</h2>
          <div className='sm:ml-6 flex items-center sm:mt-0 mt-1'>
            <h1 className='text-lg font-medium text-gray-900'>
              #{category?.ID}
            </h1>
          </div>
          <span
            className={`bg-emerald-100 text-emerald-600 text-xs font-medium mr-1 ml-2 px-2 py-0.5 rounded`}
          >
            {category?.status ? 'Aktif' : 'Kapalı'}
          </span>
          <span className='bg-cyan-100 text-cyan-600 text-xs font-medium mr-1 ml-2 px-2 py-0.5 rounded'>
            Trendyol
          </span>
        </div>

        <div className='ml-8 flex-shrink-0 flex items-center'>
          <button className='ml-4 pl-2 pr-2 mr-1 py-1 rounded-md flex items-center text-sm font-medium border '>
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
                d='M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z'
              />
            </svg>
          </button>
          <button className='ml-1 pl-2 pr-2 mr-4 py-1 rounded-md flex items-center text-sm font-medium border '>
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
                d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
          </button>
        </div>
      </div>
      <div className='flex justify-between'>
        {/* Left */}
        <div className='flex-1 mx-4 mt-5'>
          {/* Info Carts */}
          <div className='relative overflow-x-auto'>CARD</div>

          {/* Chart */}
          <div className='mt-4 min-w-full h-124 py-4 px-4 overflow-x-auto'>
            CARD
          </div>

          {/* Products Images */}
          <div>
            <div className='relative overflow-x-auto shadow-lg '>
              <div className='flex px-8 py-4 justify-center'>
                {' '}
                <Image
                  className='w-48 h-48 rounded object-contain'
                  src='/images/macbook/1.webp'
                  alt='avatar'
                  width={192}
                  height={192}
                />{' '}
                <Image
                  className='w-48 h-48 rounded object-contain'
                  src='/images/macbook/2.jpg'
                  alt='avatar'
                  width={192}
                  height={192}
                />{' '}
                <Image
                  className='w-48 h-48 rounded object-contain'
                  src='/images/macbook/3.webp'
                  alt='avatar'
                  width={192}
                  height={192}
                />{' '}
                <Image
                  className='w-48 h-48 rounded object-contain'
                  src='/images/macbook/4.jpg'
                  alt='avatar'
                  width={192}
                  height={192}
                />
              </div>
            </div>
          </div>

          {/* Category Products */}
          <div className='flex-1 bg-white text-gray-600 rounded overflow-hidden shadow-lg border'>
            <div className='mx-4 my-2'>
              <div className=' flex justify-between h-6  text-gray-600 font-medium'>
                <span className='px-2 text-sm font-semibold'>
                  Kategorideki Ürünler
                </span>
              </div>
              <div className='relative overflow-x-auto shadow-md sm:rounded-lg py-2 px-4'>
                <div className='flex items-center py-4 bg-white '>
                  <label htmlFor='table-search' className='sr-only'>
                    Search
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <svg
                        className='w-5 h-5 text-gray-500'
                        aria-hidden='true'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                    </div>
                    <input
                      type='text'
                      className='block p-2 pl-10 text-sm text-gray-500 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Ara...'
                    />
                  </div>
                </div>
                <table className='w-full text-sm text-left text-gray-500'>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                    <tr>
                      <th scope='col' className='px-6 py-3'>
                        ID
                      </th>

                      <th scope='col' className='px-6 py-3'>
                        İSİM
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        TARİH
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        DURUM
                      </th>
                      <th scope='col' className='px-6 py-3'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryProductsState.response &&
                      categoryProductsState.result.map((product) => {
                        return (
                          // TODO: Convert to a component
                          <tr
                            key={product.product_id}
                            className='bg-white border-b  hover:bg-gray-200'
                          >
                            <td className='w-4 p-4'>
                              <div className='flex items-center'>
                                #{product.product_id}
                              </div>
                            </td>

                            <th
                              scope='row'
                              className='flex items-center px-2 py-1 text-gray-900 whitespace-nowrap '
                            >
                              <div className='pl-3'>
                                <div className='text-base font-semibold'>
                                  {product.name}
                                </div>
                                <div className='font-normal text-gray-500'>
                                  <span className='text-xs'>
                                    {product.price}
                                  </span>
                                </div>
                              </div>
                            </th>

                            <td className='px-6 py-1'>
                              <span className='text-xs'>
                                {product.quantity}
                              </span>
                            </td>
                            <td className='px-6 py-1'>
                              <div className='flex items-center'>
                                <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>{' '}
                                {product.viewed
                                  ? product.viewed
                                  : 'Görüntüleme Yok'}
                              </div>
                            </td>
                            <td className='px-6 py-1'>
                              {/* <!-- Modal toggle --> */}
                              <div className='flex'>
                                <Link
                                  href={`/admin/urunler/${product.product_id}`}
                                  type='button'
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
                      })}
                  </tbody>
                </table>

                {/* Pagination */}

                <nav
                  className='flex items-center justify-between pt-4 mb-4 px-6'
                  aria-label='Table navigation'
                >
                  <span className='text-sm font-normal text-gray-500'>
                    <span className='font-semibold text-gray-900 '> 1-10</span>{' '}
                    arasi{' '}
                    <span className='font-semibold text-gray-900 '>
                      {' '}
                      Toplam 1000
                    </span>
                  </span>
                  <ul className='inline-flex items-center -space-x-px'>
                    <li>
                      <a
                        href='#'
                        className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 '
                      >
                        <span className='sr-only'>Onceki</span>
                        <svg
                          className='w-5 h-5'
                          aria-hidden='true'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                      >
                        1
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                      >
                        2
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        aria-current='page'
                        className='z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                      >
                        3
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                      >
                        ...
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                      >
                        100
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 '
                      >
                        <span className='sr-only'>Sonraki</span>
                        <svg
                          className='w-5 h-5'
                          aria-hidden='true'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </nav>

                {/* Edit user modal */}
                <div
                  id='editUserModal'
                  tabIndex='-1'
                  aria-hidden='true'
                  className='fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'
                >
                  <div className='relative w-full max-w-2xl max-h-full'>
                    {/* <!-- Modal content --> */}
                    <form
                      action='#'
                      className='relative bg-white rounded-lg shadow'
                    >
                      {/* <!-- Modal header --> */}
                      <div className='flex items-start justify-between p-4 border-b rounded-t'>
                        <h3 className='text-xl font-semibold text-gray-900 '>
                          Edit user
                        </h3>
                        <button
                          type='button'
                          className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center '
                          data-modal-hide='editUserModal'
                        >
                          <svg
                            aria-hidden='true'
                            className='w-5 h-5'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fillRule='evenodd'
                              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                              clipRule='evenodd'
                            ></path>
                          </svg>
                        </button>
                      </div>
                      {/* Modal body */}
                      <div className='p-6 space-y-6'>
                        <div className='grid grid-cols-6 gap-6'>
                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='first-name'
                              className='block mb-2 text-sm font-medium text-gray-900 '
                            >
                              First Name
                            </label>
                            <input
                              type='text'
                              name='first-name'
                              id='first-name'
                              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                              placeholder='Bonnie'
                              required=''
                            />
                          </div>
                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='last-name'
                              className='block mb-2 text-sm font-medium text-gray-900 '
                            >
                              Last Name
                            </label>
                            <input
                              type='text'
                              name='last-name'
                              id='last-name'
                              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                              placeholder='Green'
                              required=''
                            />
                          </div>
                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='email'
                              className='block mb-2 text-sm font-medium text-gray-900 '
                            >
                              Email
                            </label>
                            <input
                              type='email'
                              name='email'
                              id='email'
                              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                              placeholder='example@company.com'
                              required=''
                            />
                          </div>
                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='phone-number'
                              className='block mb-2 text-sm font-medium text-gray-900 '
                            >
                              Phone Number
                            </label>
                            <input
                              type='number'
                              name='phone-number'
                              id='phone-number'
                              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                              placeholder='e.g. +(12)3456 789'
                              required=''
                            />
                          </div>
                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='department'
                              className='block mb-2 text-sm font-medium text-gray-900 '
                            >
                              Department
                            </label>
                            <input
                              type='text'
                              name='department'
                              id='department'
                              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                              placeholder='Development'
                              required=''
                            />
                          </div>
                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='company'
                              className='block mb-2 text-sm font-medium text-gray-900 '
                            >
                              Company
                            </label>
                            <input
                              type='number'
                              name='company'
                              id='company'
                              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                              placeholder='123456'
                              required=''
                            />
                          </div>
                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='current-password'
                              className='block mb-2 text-sm font-medium text-gray-900 '
                            >
                              Current Password
                            </label>
                            <input
                              type='password'
                              name='current-password'
                              id='current-password'
                              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                              placeholder='••••••••'
                              required=''
                            />
                          </div>
                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='new-password'
                              className='block mb-2 text-sm font-medium text-gray-900 '
                            >
                              New Password
                            </label>
                            <input
                              type='password'
                              name='new-password'
                              id='new-password'
                              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                              placeholder='••••••••'
                              required=''
                            />
                          </div>
                        </div>
                      </div>
                      {/* Modal footer */}
                      <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b '>
                        <button
                          type='submit'
                          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
                        >
                          Save all
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className=' w-96 h-screen'>
          <button className='w-24 ml-2 pl-2 pr-2 py-1 rounded-sm flex items-center text-sm font-medium text-white bg-green-600 hover:bg-green-500'>
            <span className=' px-4 pr-1'>Aktif</span>
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
                d='M19.5 8.25l-7.5 7.5-7.5-7.5'
              />
            </svg>
          </button>

          {/* Category Info */}
          <div className='mx-2 my-2 bg-white text-gray-600 max-w-sm rounded overflow-hidden shadow-lg'>
            <div className=' flex justify-between h-10 border text-gray-600 font-medium'>
              <span className='px-2 py-2 font-semibold'>
                Kategori Bilgileri
              </span>
              <span className='px-2 font-semibold text-blue-500'>
                <button className='w-24 ml-2 pl-2 pr-2 py-2 rounded-sm flex items-center text-sm font-medium text-white bg-green-600 hover:bg-green-500'>
                  <span className=' px-4 pr-1'>Aktif</span>
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
                      d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                    />
                  </svg>
                </button>
              </span>
            </div>
            <div className=' border-r py-4 border-l text-xs'>
              <div className='flex justify-between pl-2 pt-2 px-4'>
                <span className=' font-medium'>Link:</span>
                <span className='ml-12'>
                  <a
                    href='#'
                    className=' flex items-center font-semibold text-blue-500'
                  >
                    Sitede Göster
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6 pl-1'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
                      />
                    </svg>
                  </a>
                </span>
              </div>
              <div className='flex items-center justify-between px-2  pt-2'>
                <span className='font-medium '>Kategori Adı:</span>
                <span className=' pr-2'>{category?.name || ''}</span>
              </div>

              <div className='flex items-center justify-between px-2'>
                <span className='font-medium pt-2'>Üst Kategori:</span>
                <div className='flex items-center justify-between pt-2'>
                  <span className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded  border border-blue-400'>
                    {category?.parent_id}
                  </span>
                </div>
              </div>
            </div>
            <div className=' border text-xs pl-2 pt-2'>
              <button
                type='button'
                className=' text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
                onClick={() => {
                  setCategoryDataEditModal(true);
                }}
              >
                Düzenle
              </button>
            </div>
          </div>

          {/* Meta */}
          <div className='mx-2 my-2 bg-white text-gray-600 max-w-sm rounded overflow-hidden shadow-lg'>
            <div className=' flex justify-between h-10 border text-gray-600 font-medium'>
              <span className='px-2 py-2 font-semibold'>Meta</span>
              <span className='px-2 py-2 font-light'>SEO Ayarları</span>
            </div>
            <div className=' border-r py-4 border-l text-xs'>
              <div className='flex justify-between pl-2 pt-2 px-4'>
                <span className=' font-medium'>Meta Başlığı:</span>
                <span className='ml-12 line-clamp-1'>
                  {category?.meta_title || ''}
                </span>
              </div>
              <div className='flex justify-between pl-2 pt-2 px-4'>
                <span className=' font-medium'>Meta Açıklaması:</span>
                <span className='ml-24 line-clamp-1'>
                  {category?.meta_description || ''}
                </span>
              </div>
              <div className='flex justify-between pl-2 pt-2 px-4'>
                <span className=' font-medium'>Meta Kelimeleri:</span>
                <span className='ml-12 line-clamp-1'>
                  {category?.meta_keyword || ''}
                </span>
              </div>

              <div className='flex justify-between pl-2 pt-2 px-4'>
                <span className=' font-medium'>Slug (SEO Link):</span>
                <span className='ml-12 line-clamp-1'>
                  {category?.keyword || ''}
                </span>
              </div>
            </div>
            <div className=' border text-xs pl-2 pt-2'>
              <button
                type='button'
                className=' text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
                onClick={() => {
                  setCategoryMetaEditModal(true);
                }}
              >
                Düzenle
              </button>
            </div>
          </div>

          {/* Category */}
          {/* <div className='mx-2 my-2 bg-white text-gray-600 max-w-sm rounded overflow-hidden shadow-lg'>
            <div className=' flex justify-between h-10 border text-gray-600 font-medium'>
              <span className='px-2 py-2 font-semibold'>Kategoriler</span>
            </div>

            <div className=' border text-xs pl-2 pt-2'>
              <button
                type='button'
                className=' text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
                onClick={() => {
                  setCategoryCategoryEditModal(true);
                }}
              >
                Düzenle
              </button>
            </div>
          </div> */}

          {/* Pazaryeri Card */}
          {/* <div className='mx-2 my-2 bg-white text-gray-600 max-w-sm rounded overflow-hidden shadow-lg'>
            <div className=' flex justify-between h-10 border text-gray-600 font-medium'>
              <span className='px-2 py-2 font-semibold'>Trendyol</span>
              <span className='px-2 font-semibold text-blue-500'>
                <button
                  className={`w-24 ml-2 pl-2 pr-2 py-2 rounded-sm flex items-center text-sm font-medium text-white ${
                    category?.category_pazaryeri !== undefined &&
                    category?.category_pazaryeri[1]?.satisdurumu > 0
                      ? 'bg-green-600  hover:bg-green-500'
                      : 'bg-red-600  hover:bg-red-500'
                  } `}
                >
                  <span className=' px-4 pr-1'>
                    {category?.category_pazaryeri !== undefined &&
                    category?.category_pazaryeri[1]?.satisdurumu > 0
                      ? 'Aktif'
                      : 'Kapalı'}
                  </span>
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
                      d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                    />
                  </svg>
                </button>
              </span>
            </div>
            <div className=' border-r py-4 border-l text-xs'>
              <div className='flex justify-between pl-2 pt-2 px-4'>
                <span className=' font-medium'>Link:</span>
                <span className='ml-12'>
                  <a
                    href='https://trendyol.com'
                    target='_blank'
                    className=' flex items-center font-semibold text-blue-500'
                  >
                    Ürüne Git
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6 pl-1'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
                      />
                    </svg>
                  </a>
                </span>
              </div>

              <div className='flex items-center justify-between px-2  pt-2'>
                <span className='font-medium '>Trendyol Siparişleri:</span>
                <span className=' pr-2'>22</span>
              </div>

              <div className='flex items-center justify-between px-2 pt-4 '>
                <span className='font-medium'>Marka:</span>
                <span className=' pr-2'>
                  {category?.pazaryerleri !== undefined &&
                    category?.pazaryerleri[1]?.marka}
                </span>
              </div>
              <div className='flex items-center justify-between px-2'>
                <span className='font-medium pt-2'>Kategori:</span>
                <div className='flex items-center justify-between pt-2'>
                  <span className='pr-2'>
                    {category?.category_pazaryeri !== undefined &&
                      category?.category_pazaryeri[1]?.kategori}
                  </span>
                </div>
              </div>
              <div className='flex items-center justify-between px-2'>
                <span className='font-medium pt-2'>Özellikler:</span>
                <div className='flex items-center justify-between pt-2'>
                  <span className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded  border border-blue-400'>
                    256GB
                  </span>
                  <span className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-400'>
                    M2
                  </span>
                  <span className='bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded  border border-indigo-400'>
                    2023
                  </span>
                </div>
              </div>
            </div>
            <div className=' border text-xs pl-2 pt-2'>
              <button
                type='button'
                className=' text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
                onClick={() => {
                  setCategoryTrendyolEditModal(true);
                }}
              >
                Düzenle
              </button>
            </div>
          </div> */}

          {/* Campaign */}
          {/* <div className='mx-2 my-2 bg-white text-gray-600 max-w-sm rounded overflow-hidden shadow-lg'>
            <div className=' flex justify-between h-10 border text-gray-600 font-medium'>
              <span className='px-2 py-2 font-semibold'>Kampanyalar</span>
              <span className='px-2 font-semibold text-blue-500'>
                <button className='w-24 ml-2 pl-2 pr-2 py-2 rounded-sm flex items-center text-sm font-medium text-white bg-green-600 hover:bg-green-500'>
                  <span className=' px-4 pr-1'>Aktif</span>
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
                      d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                    />
                  </svg>
                </button>
              </span>
            </div>
            <div className=' border-r py-4 border-l text-xs'>
              <div className='flex justify-between pl-2 pt-2 px-4'>
                <span className=' font-medium'>İndirimler:</span>
                <span className='ml-12'>%5 Havale</span>
              </div>

              <div className='flex items-center justify-between px-2'>
                <span className='font-medium pt-2'>Kuponlar:</span>
                <div className='flex items-center justify-between pt-2'>
                  <span className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded  border border-blue-400'>
                    ₺100
                  </span>
                  <span className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-400'>
                    ₺200
                  </span>
                  <span className='bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded  border border-indigo-400'>
                    ₺300
                  </span>
                </div>
              </div>
            </div>
            <div className=' border text-xs pl-2 pt-2'>
              <button
                type='button'
                className=' text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
              >
                Düzenle
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Category;
