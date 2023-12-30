'use client';
import React, { useState, useEffect } from 'react';
import { getCustomerOrderHistory } from '@/services/customer';
import { Popover } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import CustomerDataEditModal from './CustomerDataEditModal';
import CustomerAddressEditModal from './CustomerAddressEditModal';

function CustomerComp(props) {
  const [customer, setCustomer] = useState(props.customer);
  const [customerDataEditModal, setCustomerDataEditModal] = useState(false);
  const [customerAddressEditModal, setCustomerAddressEditModal] =
    useState(false);
  const [orderCustomerState, setOrderCustomerState] = useState(false);

  useEffect(() => {
    async function getCustomerOrdersHandle() {
      const customerOrders = await getCustomerOrderHistory(
        customer.customer_id
      );
      setOrderCustomerState(customerOrders);
    }
    getCustomerOrdersHandle();
  }, [customer]);

  // TODO: TITLE
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   document.title = product?.product_description[5]?.name;
  // });

  return (
    <div className='mx-8'>
      {/* CUSTOMER DATA EDIT MODAL */}
      {customerDataEditModal ? (
        <CustomerDataEditModal
          customer={customer}
          setCustomer={setCustomer}
          closeModal={setCustomerDataEditModal}
        />
      ) : null}

      {/* PRODUCT ADDRESS EDIT MODAL */}
      {customerAddressEditModal ? (
        <CustomerAddressEditModal
          customer={customer}
          setCustomer={setCustomer}
          closeModal={setCustomerAddressEditModal}
        />
      ) : null}

      {/* Top Nav */}
      <div className='flex items-center justify-between py-2'>
        <div className='sm:flex sm:items-center mx-4'>
          <h2 className='text-lg font-medium text-gray-900'>
            {customer.firstname + ' ' + customer.lastname}
          </h2>
          <div className='sm:ml-6 flex items-center sm:mt-0 mt-1'>
            <h1 className='text-lg font-medium text-gray-900'>
              #{customer?.ID}
            </h1>
          </div>
          <span
            className={`bg-emerald-100 text-emerald-600 text-xs font-medium mr-1 ml-2 px-2 py-0.5 rounded`}
          >
            {customer?.status ? 'Aktif' : 'Kapalı'}
          </span>
          <span className='bg-cyan-100 text-cyan-600 text-xs font-medium mr-1 ml-2 px-2 py-0.5 rounded'>
            Aktif
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
          <div className='relative overflow-x-auto'>
            <div className='flex justify-between px-4 py-4'>
              {/* <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow flex justify-between'>
                <div>
                  <h5 className='mb-2 text-sm font-semibold tracking-tight text-gray-900'>
                    Stok Miktarı
                  </h5>
                  <p className='mb-3 font-light text-gray-700 text-xs '>
                    (Pazaryerleri Dahil)
                  </p>
                  <span className='font-bold'>{product?.quantity}</span>
                </div>
                <span className='pl-4'>
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
                      d='M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </span>
              </div> */}

              {/* <Card
                className='max-w-xs mr-1'
                decoration='top'
                decorationColor='green'
              >
                <Flex justifyContent='between' alignItems='center'>
                  <Text>Toplam Satış</Text>
                  <BadgeDelta
                    deltaType='moderateIncrease'
                    isIncreasePositive={true}
                    size='xs'
                  >
                    +12.3%
                  </BadgeDelta>
                </Flex>
                <Metric>{product?.quantity}</Metric>
              </Card>
              <Card
                className='max-w-xs mx-1'
                decoration='top'
                decorationColor='sky'
              >
                <Flex justifyContent='between' alignItems='center'>
                  <Text>Tüm Siparişler</Text>
                  <BadgeDelta
                    deltaType='moderateIncrease'
                    isIncreasePositive={true}
                    size='xs'
                  >
                    +25.2%
                  </BadgeDelta>
                </Flex>
                <Metric>
                  {orderProductState?.totalOrder?.totalQuantity !== undefined &&
                    orderProductState.totalOrder.totalQuantity}
                </Metric>
              </Card>
              <Card
                className='max-w-xs mx-1'
                decoration='top'
                decorationColor='violet'
              >
                <Flex justifyContent='between' alignItems='center'>
                  <Text>Kazanç</Text>
                  <BadgeDelta
                    deltaType='moderateIncrease'
                    isIncreasePositive={true}
                    size='xs'
                  >
                    +55.9%
                  </BadgeDelta>
                </Flex>
                <Metric>
                  ₺
                  {(orderProductState?.totalOrder?.totalOrder !== undefined &&
                    Number(orderProductState.totalOrder.totalOrder).toFixed(
                      2
                    )) ||
                    ''}
                </Metric>
              </Card>
              <Card
                className='max-w-xs ml-1'
                decoration='top'
                decorationColor='amber'
              >
                <Flex justifyContent='between' alignItems='center'>
                  <Text>Toplam Satılan</Text>
                  <BadgeDelta
                    deltaType='moderateDecrease'
                    isIncreasePositive={true}
                    size='xs'
                  >
                    -11
                  </BadgeDelta>
                </Flex>
                <Metric>5</Metric>
              </Card> */}
            </div>
          </div>

          {/* Addresses */}
          <div className='flex'>
            <div className='flex-1 my-4 mr-1  bg-white text-gray-600 rounded overflow-hidden shadow-lg border'>
              <div className='mx-4 my-2'>
                <div className=' flex justify-between h-6  text-gray-600 font-medium'>
                  <span className='px-2 text-sm font-semibold'>Adresler</span>
                </div>

                {customer?.addresses?.map((id) => {
                  let address = customer.addresses[id];

                  return (
                    <div
                      key={address.ID}
                      className=' text-xs border border-dashed m-2 pr-2 shadow'
                    >
                      <h4 className='text-sm italic mt-2 ml-2'>
                        Adres {address.ID}
                      </h4>
                      <div className='flex  justify-between'>
                        <div className='flex w-42 min-h-16 px-4'>
                          <div className='ml-4'>
                            <span className='text-lg font-semibold'>
                              {address.firstname ||
                                '' + ' ' + address.lastname ||
                                ''}
                            </span>
                            <br />
                            <span className='text-lg'>
                              {address.address_1 ||
                                '' + ' ' + address.city ||
                                '' + ' ' + address.postcode ||
                                '' + ' ' + address.zone ||
                                '' + ' ' + address.country ||
                                ''}
                            </span>
                          </div>
                        </div>
                        {address.address_id == customer.address_id ? (
                          <span className='bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-1.5 max-h-8 rounded '>
                            Varsayılan
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className='flex items-center justify-between px-2 '>
                  <button
                    className=' text-gray-900 bg-white border border-gray-300
                  focus:outline-none hover:bg-gray-100 focus:ring-4
                  focus:ring-gray-200 font-medium rounded-lg text-md px-2 py-2.5 min-w-full
                  mr-2 mb-2 '
                    onClick={() => setCustomerAddressEditModal(true)}
                  >
                    Düzenle
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className='flex-1 bg-white text-gray-600 rounded overflow-hidden shadow-lg border'>
            <div className='mx-4 my-2'>
              <div className=' flex justify-between h-6  text-gray-600 font-medium'>
                <span className='px-2 text-sm font-semibold'>
                  Son Siparişler
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
                        TARİH
                      </th>

                      <th scope='col' className='px-6 py-3'>
                        DURUM
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        ÜRÜNLER
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        TUTAR
                      </th>
                      <th scope='col' className='px-6 py-3'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderCustomerState.order &&
                      orderCustomerState.order.map((order) => {
                        const [date, time] = order.date_added.split(' ');
                        const totalSum = order.product.reduce(
                          (sum, product) => {
                            return sum + parseFloat(product.total);
                          },
                          0
                        );

                        return (
                          <tr
                            key={order.order_id}
                            className='bg-white border-b  hover:bg-gray-200'
                          >
                            <td className='w-4 p-4'>
                              <div className='flex items-center'>
                                #{order.order_id}
                              </div>
                            </td>

                            <th
                              scope='row'
                              className='flex items-center px-2 py-1 text-gray-900 whitespace-nowrap '
                            >
                              <div className='pl-3'>
                                <div className='text-sm font-semibold'>
                                  {date}
                                </div>
                                <div className='font-normal text-gray-500'>
                                  <span className='text-xs'>{time}</span>
                                </div>
                              </div>
                            </th>

                            <td className='px-6 py-1'>
                              <div className='flex items-center'>
                                <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>{' '}
                                {order.order_status
                                  ? order.order_status
                                  : 'Bilinmiyor'}
                              </div>
                            </td>

                            <td className='w-4 p-4'>
                              <div className='flex items-center'>
                                <div className='sm:flex sm:items-center'>
                                  <div className=' flex items-center sm:mt-0 mt-1'>
                                    {order.product.map((productListItem) => {
                                      return (
                                        <span
                                          key={productListItem.product_id}
                                          className=''
                                        >
                                          <Popover className='relative'>
                                            <Popover.Button>
                                              <Image
                                                className='w-12 h-12 rounded object-cover'
                                                src={
                                                  productListItem.thumb ||
                                                  'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
                                                }
                                                alt='avatar'
                                                width={24}
                                                height={24}
                                              />
                                            </Popover.Button>
                                            <Link
                                              href={`/admin/urunler/${productListItem.product_id}`}
                                            >
                                              <Popover.Panel className='absolute z-10  w-72 -mt-36 -ml-12'>
                                                <div className='flex bg-gray-100'>
                                                  <div>
                                                    <Image
                                                      className=' rounded object-cover'
                                                      src={
                                                        productListItem.thumb
                                                      }
                                                      alt='avatar'
                                                      width={130}
                                                      height={130}
                                                    />
                                                  </div>
                                                  <div className='ml-2 '>
                                                    <h3 className='font-semibold'>
                                                      {productListItem.name}
                                                      Deneme Urun Deneme Urun
                                                      Deneme Urun Deneme Urun
                                                      Deneme
                                                    </h3>
                                                  </div>
                                                </div>
                                              </Popover.Panel>
                                            </Link>
                                          </Popover>
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className='px-6 py-1'>
                              <span className='text-lg'>
                                {totalSum.toLocaleString('tr-TR', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </span>
                            </td>
                            <td className='px-6 py-1'>
                              {/* <!-- Modal toggle --> */}
                              <div className='flex'>
                                <Link
                                  href={`/admin/siparisler/${order.order_id}`}
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

          {/* Product Info */}
          <div className='mx-2 my-2 bg-white text-gray-600 max-w-sm rounded overflow-hidden shadow-lg'>
            <div className=' flex justify-between h-10 border text-gray-600 font-medium'>
              <span className='px-2 py-2 font-semibold'>Müşteri Bilgileri</span>
            </div>
            <div className=' border-r py-4 border-l text-xs'>
              <div className='flex items-center justify-between px-2  pt-2'>
                <span className='font-medium '>Müşteri Adı:</span>
                <span className=' pr-2'>
                  {customer.firstname + ' ' + customer.lastname}
                </span>
              </div>
              <div className='flex items-center justify-between px-2 pt-3 '>
                <span className='font-medium'>Mail:</span>
                <span className=' pr-2'>{customer.email}</span>
              </div>
              <div className='flex items-center justify-between px-2 pt-3 '>
                <span className='font-medium'>TEL:</span>
                <span className=' pr-2'>{customer.telephone}</span>
              </div>
              <div className='flex items-center justify-between px-2 pt-3 '>
                <span className='font-medium'>Bülten Aboneliği:</span>
                <span className=' pr-2'>
                  {customer.newsletter ? 'Açık' : 'Kapalı'}
                </span>
              </div>
              <div className='flex items-center justify-between px-2 pt-3 '>
                <span className='font-medium'>Müşteri Grubu:</span>
                <span className=' pr-2'>
                  {
                    customer.customer_groups?.find(
                      (group) =>
                        group.customer_group_id == customer.customer_group_id
                    ).name
                  }
                </span>
              </div>
            </div>
            <div className=' border text-xs pl-2 pt-2'>
              {/* <Link
                href={`/admin/urunler/${product.urunId}?edit=data`}
                scroll={false}
              >
                <button
                  type='button'
                  className=' text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
                >
                  Düzenle
                </button>
              </Link> */}

              <button
                type='button'
                className=' text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
                onClick={() => setCustomerDataEditModal(true)}
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

export default CustomerComp;
