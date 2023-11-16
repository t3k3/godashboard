'use client';
import React, { useState, useEffect, Fragment } from 'react';
import Image from 'next/image';
import OrderHistoryEditModal from '../Modals/Order/OrderHistoryEditModal';
import { getOrderHistory } from '@/services/order';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

function OrderComp(props) {
  const [order, setOrder] = useState(props.order);
  const [orderHistoryEditModal, setOrderHistoryEditModal] = useState(false);
  // const orderHistory = props.orderHistory;
  const [selectedStatus, setSelectedStatus] = useState(
    order.order_statuses.find(
      (statuse) => statuse.order_status_id === order.order_status_id
    )
  );

  const [orderHistory, setOrderHistory] = useState(false);

  useEffect(() => {
    async function getOrderHistoryHandle() {
      const orderHistoryTemp = await getOrderHistory(order.order_id);

      setOrderHistory(orderHistoryTemp);
    }
    getOrderHistoryHandle();
  }, [order]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className='mx-8'>
      {/* ORDER HISTORY EDIT MODAL */}
      {orderHistoryEditModal ? (
        <OrderHistoryEditModal
          orderId={order.order_id}
          selectedStatus={selectedStatus}
          closeModal={setOrderHistoryEditModal}
        />
      ) : null}

      {/* Top Nav */}
      <div className='flex items-center justify-between py-2'>
        <div className='sm:flex sm:items-center mx-4'>
          <h2 className='text-lg font-medium text-gray-900'>Sipariş No:</h2>
          <div className='sm:ml-2 flex items-center sm:mt-0 mt-1'>
            <h1 className='text-lg font-medium text-gray-900'>
              #{order.order_id}
            </h1>
          </div>
          <div className='sm:ml-6 flex items-center sm:mt-0 mt-1'>
            <h1 className='text-lg font-medium text-gray-900'>
              {order.firstname + ' ' + order.lastname}
            </h1>
          </div>
          <span className='bg-emerald-100 text-emerald-600 text-xs font-medium mr-1 ml-2 px-2 py-0.5 rounded'>
            Ödendi
          </span>
          <span className='bg-cyan-100 text-cyan-600 text-xs font-medium mr-1 ml-2 px-2 py-0.5 rounded'>
            Paytr
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
        <div className='flex-1 mx-4 mt-9'>
          {/* Products Table */}
          <div>
            <div className='relative overflow-x-auto shadow-lg'>
              <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                  <tr>
                    <th scope='col' className='px-6 py-3 text-lg'>
                      RESİM
                    </th>
                    <th scope='col' className='px-6 py-3 text-lg'>
                      ÜRÜNLER
                    </th>
                    <th scope='col' className='px-6 py-3 text-lg'>
                      SEÇENEKLER
                    </th>
                    <th scope='col' className='px-6 py-3 text-lg'>
                      FİYAT
                    </th>
                    <th scope='col' className='px-6 py-3 text-lg'>
                      ADET
                    </th>
                    <th scope='col' className='px-6 py-3 text-lg'>
                      TOPLAM
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {console.log('ORDER: ', order)}
                  {order.order_products.map((order_product, index) => {
                    return (
                      <tr key={index} className='bg-white border-b '>
                        <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                          <Image
                            src={
                              order_product.image ||
                              'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
                            }
                            alt={order_product.name}
                            width={80}
                            height={80}
                          ></Image>
                        </th>
                        <th
                          scope='row'
                          className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                        >
                          <Link
                            href={`/admin/urunler/${order_product.product_id}`}
                            className='hover:text-blue-500'
                          >
                            {order_product.name}
                          </Link>
                        </th>
                        <td className='px-6 py-4'>
                          {order_product?.option?.map((opt) => {
                            return (
                              <div key={opt.product_option_value_id}>
                                <p>
                                  <span>{opt.name} :</span>
                                  <span className='font-bold'>{opt.value}</span>
                                </p>
                              </div>
                            );
                          })}
                        </td>
                        <td className='px-6 py-4'>
                          ₺{Number(order_product.price).toFixed(2)}
                        </td>
                        <td className='px-6 py-4'>{order_product.quantity}</td>
                        <td className='px-6 py-4'>
                          ₺{Number(order_product.total).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}

                  {order.totals?.map((total, index) => {
                    return (
                      <tr key={index} className='bg-white'>
                        <th
                          scope='row'
                          className='px-6 py-1 font-medium text-gray-900 whitespace-nowrap '
                        ></th>
                        <td className='px-6 py-1'></td>
                        <td className='px-6 py-1'></td>
                        <td className='px-6 py-1'></td>
                        <td className='px-6 py-1 font-semibold'>
                          {total.title}
                        </td>
                        <td className='px-6 py-1 font-bold'>{total.text}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipping and Payment */}
          <div className='flex'>
            <div className='flex-1 my-4 mr-1  bg-white text-gray-600 rounded overflow-hidden shadow-lg border'>
              <div className='mx-4 my-2'>
                <div className=' flex justify-between h-6  text-gray-600 font-medium'>
                  <span className='px-2 text-sm font-semibold'>Kargo</span>
                </div>
                <div className=' h-32 text-xs'>
                  <div>
                    <div className='flex w-42 h-16 px-4 pt-4'>
                      <Image
                        className='w-10 h-10 rounded-md'
                        src='/images/yk.png'
                        width={40}
                        height={40}
                        alt='kargo'
                      />

                      <div className='ml-2'>
                        <span className='text-md font-semibold'>
                          Yurtiçi kargo
                        </span>
                        <br />
                        <span className='text-xs'>1-3 İş günü </span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between px-2 pt-4 '>
                    <button className='font-medium border rounded px-2 py-2 min-w-full '>
                      Kargo Hareketleri
                    </button>
                  </div>
                </div>
              </div>
            </div>{' '}
            <div className='flex-1 my-4 ml-1  bg-white text-gray-600 rounded overflow-hidden shadow-lg border'>
              <div className='mx-2 my-2'>
                <div className=' flex justify-between h-6  text-gray-600 font-medium'>
                  <span className='px-2 text-sm font-semibold'>Ödeme</span>
                </div>
                <div className=' h-32 text-xs'>
                  <div>
                    <div className='w-full h-16 pt-1 px-4'>
                      <Image
                        className='hidden w-14 h-10 rounded-md'
                        src='/images/paytr.png'
                        width={40}
                        height={40}
                        alt='kargo'
                      />
                      <div>
                        <div className='ml-1 my-2 flex justify-between'>
                          <span className='text-md font-semibold'>
                            Ara Toplam
                          </span>
                          <span className='text-xs'>₺6999</span>
                        </div>
                        <div className='ml-1 my-2 flex justify-between'>
                          <span className='text-md font-semibold'>Kargo</span>
                          <span className='text-xs'>₺30 </span>
                        </div>
                        <div className='ml-1 my-2 flex justify-between'>
                          <span className='text-md font-semibold'>
                            KDV (%20)
                          </span>
                          <span className='text-xs'>₺699</span>
                        </div>
                        <div className='ml-1 my-3 flex justify-between border-t'>
                          <span className='text-md font-semibold'>Toplam</span>
                          <span className='text-xs'>₺7399</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* History */}
          <div className='flex-1 bg-white text-gray-600 rounded overflow-hidden shadow-lg border'>
            <div className='mx-4 my-2'>
              <div className=' flex justify-between h-6  text-gray-600 font-medium'>
                <span className='px-2 text-sm font-semibold'>Hareketler</span>
              </div>
              <div className='mx-2 my-4'>
                <ol className='relative border-l border-gray-200 dark:border-gray-700'>
                  {orderHistory &&
                    orderHistory.histories.map((history, index) => {
                      return (
                        <li key={index} className='mb-10 ml-4'>
                          <div className='absolute w-3 h-3 bg-green-600 rounded-full mt-1.5 -left-1.5 border border-white'></div>
                          <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
                            {history.date_added}
                          </time>
                          <div className='flex items-center justify-between'>
                            <h3 className='text-lg font-semibold text-gray-900'>
                              {history.status}
                            </h3>

                            <span>
                              <h3>Müşteri Bildirimi:</h3>
                              <b>{history.notify}</b>
                            </span>
                          </div>
                          <p className='mb-4 text-base font-normal text-gray-500'>
                            {history.comment}
                          </p>
                        </li>
                      );
                    })}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className=' w-96 h-screen '>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='ml-2 pl-2 pr-2 py-2 h-10 rounded-sm flex w-full justify-center gap-x-1.5  bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-white'>
                {
                  order.order_statuses.find(
                    (status) => status.order_status_id === order.order_status_id
                  )?.name
                }
                <ChevronDownIcon
                  className=' h-5 w-5 text-white'
                  aria-hidden='true'
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none '>
                <div className='py-1'>
                  {order.order_statuses.map((status) => {
                    return (
                      <Menu.Item key={status.order_status_id}>
                        {({ active }) => (
                          <span
                            onClick={() => {
                              setSelectedStatus(status);
                              setOrderHistoryEditModal(true);
                            }}
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm '
                            )}
                          >
                            {status.name}
                          </span>
                        )}
                      </Menu.Item>
                    );
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <div
            id='dropdownDivider'
            className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600'
          >
            <ul
              className='py-2 text-sm text-gray-700 dark:text-gray-200'
              aria-labelledby='dropdownDividerButton'
            >
              <li>
                <a
                  href='#'
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Earnings
                </a>
              </li>
            </ul>
            <div className='py-2'>
              <a
                href='#'
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
              >
                Separated link
              </a>
            </div>
          </div>

          {/* ORDER INFO */}
          <div className='mx-2 my-2 bg-white text-gray-600 max-w-sm rounded overflow-hidden shadow-lg'>
            <div className=' flex justify-between h-10 border text-gray-600 font-medium'>
              <span className='px-2 py-2 font-semibold'>Sipariş Detayları</span>
              <span className='px-2 py-2 font-semibold text-gray-500'>
                #{order.order_id}
              </span>
            </div>
            <div className=' mb-4 border-r border-l text-xs'>
              <div className='flex items-center justify-between px-2 pt-4'>
                <span className='font-medium'>Müşteri Adı:</span>
                <span>{order.firstname + ' ' + order.lastname}</span>
              </div>
              <div className='flex items-center justify-between px-2 pt-4 '>
                <span className='font-medium'>Tel:</span>
                <span>{order.telephone}</span>
              </div>
              <div className='flex items-center justify-between px-2 pt-4'>
                <span className='font-medium'>Mail:</span>
                <span className='ml-12'>{order.email}</span>
              </div>
            </div>

            <div className=' border text-xs pl-2 pt-2 hidden'>
              <button
                type='button'
                className=' text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
                onClick={() => {
                  setOrderDataEditModal(true);
                }}
              >
                Düzenle
              </button>
            </div>
          </div>

          {/* Shipping Card */}
          <div className='mx-2 my-2 bg-white text-gray-600 max-w-sm rounded overflow-hidden shadow-lg '>
            <div className=' flex justify-between h-10 border text-gray-600 font-medium'>
              <span className='px-2 py-2 font-semibold'>Teslimat Adresi</span>
              <span className='px-2 py-2 font-semibold text-blue-500'>
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
              </span>
            </div>
            <div className=' h-40 border-r border-l text-xs'>
              <div className='flex items-center justify-between px-2 pt-4 '>
                <span className='font-medium'>Adı:</span>
                <span>
                  {order.shipping_firstname + ' ' + order.shipping_lastname}
                </span>
              </div>
              <div className='flex items-center justify-between px-2 pt-4 '>
                <span className='font-medium'>Tel:</span>
                <span>{order.telephone}</span>
              </div>
              <div className='flex items-center justify-between px-2 pt-4'>
                <span className='font-medium'>Mail:</span>
                <span className='ml-12'>{order.email}</span>
              </div>
              <div className='flex justify-between px-2 pt-4'>
                <span className='font-medium'>Adres:</span>
                <span className='ml-12'>
                  {order.shipping_address_1 +
                    ' ' +
                    order.shipping_city +
                    ' ' +
                    order.countries.find(
                      (country) =>
                        country.country_id == order.shipping_country_id
                    )?.name}
                </span>
              </div>
            </div>
            <div className='flex justify-between border text-xs px-2 pt-2'>
              <span className='font-medium'>Not:</span>
              <span className='ml-12 my-4'>{order.comment}</span>
            </div>

            <div className=' border-b border-l border-r text-xs pl-2 pt-2 hidden'>
              <button
                type='button'
                className=' text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
                onClick={() => {
                  setShippingEditModal(true);
                }}
              >
                Düzenle
              </button>
            </div>
          </div>

          {/* Invoice Card */}
          <div className='mx-2 my-2 bg-white text-gray-600 max-w-sm rounded overflow-hidden shadow-lg'>
            <div className=' flex justify-between h-10 border text-gray-600 font-medium'>
              <span className='px-2 py-2 font-semibold'>Fatura Adresi</span>
              <span className='px-2 py-2 font-semibold text-blue-500'>
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
              </span>
            </div>
            <div className=' h-40 border-r border-l text-xs'>
              <div className='flex items-center justify-between px-2 pt-4 '>
                <span className='font-medium'>Adı:</span>
                <span>{order.payment_company}</span>
              </div>
              <div className='flex items-center justify-between px-2 pt-4 '>
                <span className='font-medium'>Tel:</span>
                <span>{order.telephone}</span>
              </div>
              <div className='flex items-center justify-between px-2 pt-4'>
                <span className='font-medium'>Mail:</span>
                <span className='ml-12'>{order.email}</span>
              </div>
              <div className='flex justify-between px-2 pt-4'>
                <span className='font-medium'>Adres:</span>
                <span className='ml-12'>
                  {order.payment_address_1 +
                    ' ' +
                    order.payment_city +
                    ' ' +
                    order.countries.find(
                      (country) =>
                        country.country_id === order.payment_country_id
                    )?.name}
                </span>
              </div>
            </div>
            <div className='flex justify-between border text-xs px-2 pt-2'>
              <span className='font-medium'>Not:</span>
              <span className='ml-12 my-4'>{order.comment}</span>
            </div>

            <div className=' border-b border-l border-r text-xs pl-2 pt-2 hidden'>
              <button
                type='button'
                className=' text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
                onClick={() => {
                  setShippingEditModal(true);
                }}
              >
                Düzenle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderComp;
