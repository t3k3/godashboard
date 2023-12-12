'use client';
import React, { useState, useEffect } from 'react';
import { getOptions } from '@/services/option';

import Image from 'next/image';
import {
  editProduct,
  editProductStatus,
  getSingleProduct,
} from '@/services/product';
import Link from 'next/link';
import ProductImages from '../Modals/Product/ProductImages';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import ProductDataEditModal from '@/components/admin/Modals/Product/ProductDataEditModal';
import ProductMetaEditModal from '@/components/admin/Modals/Product/ProductMetaEditModal';
import ProductVideoEditModal from '@/components/admin/Modals/Product/ProductVideoEditModal';
import ProductCategoryEditModal from '@/components/admin/Modals/Product/ProductCategoryEditModal';
import ProductAttributeEditModal from '@/components/admin/Modals/Product/ProductAttributeEditModal';
import ProductOptionEditModal from '@/components/admin/Modals/Product/ProductOptionEditModal';
import ProductTrendyolEditModal from '@/components/admin/Modals/Product/ProductTrendyolEditModal';
// import dynamic from 'next/dynamic';
import { getProductOrderHistory } from '@/services/product';

function ProductComp(props) {
  // const ProductDataEditModal = dynamic(
  //   () => import('@/components/admin/Modals/Product/ProductDataEditModal'),
  //   { ssr: false }
  // );
  // const ProductMetaEditModal = dynamic(
  //   () => import('@/components/admin/Modals/Product/ProductMetaEditModal'),
  //   {
  //     suspense: true,
  //   }
  // );
  // const ProductVideoEditModal = dynamic(
  //   () => import('@/components/admin/Modals/Product/ProductVideoEditModal'),
  //   {
  //     suspense: true,
  //   }
  // );
  // const ProductCategoryEditModal = dynamic(
  //   () => import('@/components/admin/Modals/Product/ProductCategoryEditModal'),
  //   {
  //     suspense: true,
  //   }
  // );
  // const ProductAttributeEditModal = dynamic(
  //   () => import('@/components/admin/Modals/Product/ProductAttributeEditModal'),
  //   {
  //     suspense: true,
  //   }
  // );
  // const ProductOptionEditModal = dynamic(
  //   () => import('@/components/admin/Modals/Product/ProductOptionEditModal'),
  //   {
  //     suspense: true,
  //   }
  // );
  // const ProductTrendyolEditModal = dynamic(
  //   () => import('@/components/admin/Modals/Product/ProductTrendyolEditModal'),
  //   {
  //     suspense: true,
  //   }
  // );

  //const searchParams = useSearchParams();

  const [product, setProduct] = useState(props.product);
  const [options, setOptions] = useState(props.options);
  const [productDataEditModal, setProductDataEditModal] = useState(false);
  const [productMetaEditModal, setProductMetaEditModal] = useState(false);
  const [productVideoEditModal, setProductVideoEditModal] = useState(false);
  const [productCategoryEditModal, setProductCategoryEditModal] =
    useState(false);
  const [productAttributeEditModal, setProductAttributeEditModal] =
    useState(false);
  const [productOptionEditModal, setProductOptionEditModal] = useState(false);
  const [productTrendyolEditModal, setProductTrendyolEditModal] =
    useState(false);
  const [orderProductState, setOrderProductState] = useState(false);

  //TODO: ORDER PRODUCTS aktif edilecek
  // useEffect(() => {
  //   async function getOrderProductsHandle() {
  //     const orderProducts = await getProductOrderHistory(product.urunId);
  //     setOrderProductState(orderProducts);
  //     // console.log('orderProducts', orderProducts);
  //   }
  //   getOrderProductsHandle();
  // }, [product]);

  const handleChange = async (e) => {
    console.log('ÜRÜN EDİTİNDEN GÖNDERİLEN PRODUCT DATA:: ', product);

    let data = {
      status: e.target.value === 'true', // 'true' stringini boolean değere dönüştürür
    };

    const response = await editProductStatus(data, props.product.ID);
    if (response.status === 200) {
      let prod = { ...product };
      prod.status = data.status;
      setProduct(prod);
    }
  };

  //TODO: Burada modal kaptma ve ürün stateini güncellememe gibi bir aksiyon gerekiyor.
  // Geçici olarak böyle yapıldı.
  const handleCloseModal = async (id) => {
    const response = await getSingleProduct('', id);
    console.log('ersponse : ', response);
    if (response.status === 200) {
      setProduct(response.product);
    }
  };

  // const handleChange = async (e) => {
  //   console.log('ÜRÜN EDİTİNDEN GÖNDERİLEN PRODUCT DATA:: ', product);

  //   let prod = { ...product };

  //   prod.status = e.target.value;

  //   const response = await editProductStatus(prod, product.ID);
  //   if (response.status === 200) {
  //     setProduct(prod);
  //   }
  // };

  // useEffect(() => {
  //   async function fetchProduct() {
  //     const { product } = await getSingleProduct(props.product.ID);
  //     setProduct(product);
  //   }
  //   fetchProduct();
  // }, []);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = 'Düzenle - ' + product?.name;
  });

  return (
    <div className='mx-8'>
      {/* PRODUCT DATA EDIT MODAL */}
      {productDataEditModal ? (
        <ProductDataEditModal
          product={product}
          setProduct={setProduct}
          closeModal={setProductDataEditModal}
        />
      ) : null}

      {/* PRODUCT META EDIT MODAL */}
      {productMetaEditModal ? (
        <ProductMetaEditModal
          product={product}
          setProduct={setProduct}
          closeModal={setProductMetaEditModal}
        />
      ) : null}

      {/* PRODUCT VIDEO EDIT MODAL */}
      {productVideoEditModal ? (
        <ProductVideoEditModal
          product={product}
          setProduct={setProduct}
          closeModal={setProductVideoEditModal}
        />
      ) : null}

      {/* PRODUCT CATEGORY EDIT MODAL */}
      {productCategoryEditModal ? (
        <ProductCategoryEditModal
          product={product}
          setProduct={setProduct}
          closeModal={setProductCategoryEditModal}
        />
      ) : null}

      {/* PRODUCT ATTRİBUTE EDIT MODAL */}
      {productAttributeEditModal ? (
        <ProductAttributeEditModal
          product={product}
          setProduct={setProduct}
          closeModal={setProductAttributeEditModal}
        />
      ) : null}

      {/* PRODUCT OPTION EDIT MODAL */}
      {productOptionEditModal ? (
        <ProductOptionEditModal
          product={product}
          id={product.ID}
          options={options}
          setProduct={setProduct}
          handleCloseModal={handleCloseModal}
          closeModal={setProductOptionEditModal}
        />
      ) : null}

      {/* PRODUCT TRENDYOL EDIT MODAL */}
      {productTrendyolEditModal ? (
        <ProductTrendyolEditModal
          product={product}
          setProduct={setProduct}
          closeModal={setProductTrendyolEditModal}
        />
      ) : null}

      {/* Top Nav */}
      <div className='flex items-center justify-between py-2'>
        <div className='sm:flex sm:items-center mx-4'>
          <h2 className='text-lg font-medium text-gray-900'>{product?.name}</h2>
          <div className='sm:ml-6 flex items-center sm:mt-0 mt-1'>
            <h1 className='text-lg font-medium text-gray-900'>
              #{product?.ID}
            </h1>
          </div>
          <span
            className={`${
              product?.status
                ? 'bg-emerald-200 text-emerald-600'
                : 'bg-red-200 text-red-900'
            }   text-lg font-medium mr-1 ml-2 px-2 py-0.5 rounded`}
          >
            {product?.status ? 'Aktif' : 'Kapalı'}
          </span>
          <span className='bg-cyan-100 text-cyan-600 text-lg font-medium mr-1 ml-2 px-2 py-0.5 rounded'>
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
        <div className='flex-1 mx-4 mt-0'>
          {/* Info Carts */}
          <div className='relative overflow-x-auto'>
            <div className='flex justify-between px-4 py-0'>
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

          {/* Chart */}
          <div className='mt-4 min-w-full h-124 py-4 px-4 overflow-x-auto'>
            {/* <Card>
              <Title>Son 6 Ay Satış Analizi</Title>
              <AreaChart
                className='h-72 mt-4'
                data={chartdata}
                index='date'
                categories={['Adet', 'Başka Bir Data']}
                colors={['indigo', 'cyan']}
                valueFormatter={dataFormatter}
              />
            </Card> */}
          </div>

          {/* Products Images */}
          <div>
            <div className='relative overflow-x-auto shadow-lg '>
              <DndProvider backend={HTML5Backend}>
                <ProductImages product={product} setProduct={setProduct} />
              </DndProvider>
            </div>
          </div>
          {/* 
          <ProductImageUpload />

          <TestProductImageUpload />

          <Dropzone /> */}

          {/* Shipping and Payment */}
          <div className='flex'>
            <div className='flex-1 my-4 mr-1  bg-white text-gray-600 rounded overflow-hidden shadow-lg border'>
              <div className='mx-4 my-2'>
                <div className=' flex justify-between h-6  text-gray-600 font-medium'>
                  <span className='px-2 text-sm font-semibold'>Kargo</span>
                </div>
                <div className=' text-xs'>
                  <div className='flex pt-4 justify-between'>
                    <div className='flex w-42 h-16 px-4'>
                      <Image
                        className='w-10 h-10 rounded-md'
                        src='/images/yk.png'
                        alt='kargo'
                        height={40}
                        width={40}
                      />

                      <div className='ml-2'>
                        <span className='text-md font-semibold'>
                          Yurtiçi kargo
                        </span>
                        <br />
                        <span className='text-xs'>1-3 İş günü </span>
                      </div>
                    </div>
                    <span className='text-lg'>₺44</span>
                  </div>
                </div>
                <div className=' text-xs'>
                  <div className='flex justify-between'>
                    <div className='flex w-42 h-16 px-4'>
                      <Image
                        className='w-10 h-10 rounded-md'
                        src='/images/aras.png'
                        alt='kargo'
                        height={40}
                        width={40}
                      />

                      <div className='ml-2'>
                        <span className='text-md font-semibold'>
                          Aras kargo
                        </span>
                        <br />
                        <span className='text-xs'>1-3 İş günü </span>
                      </div>
                    </div>
                    <span className='text-lg'>₺38</span>
                  </div>
                </div>
                <div className=' text-xs'>
                  <div className='flex justify-between'>
                    <div className='flex w-42 h-16 px-4'>
                      <Image
                        className='w-10 h-10 rounded-md'
                        src='/images/mng.png'
                        alt='kargo'
                        height={40}
                        width={40}
                      />

                      <div className='ml-2'>
                        <span className='text-md font-semibold'>MNG kargo</span>
                        <br />
                        <span className='text-xs'>1-3 İş günü </span>
                      </div>
                    </div>
                    <span className='text-lg'>₺36</span>
                  </div>
                </div>
                <div className=' text-xs'>
                  <div className='flex justify-between'>
                    <div className='flex w-42 h-16 px-4'>
                      <Image
                        className='w-10 h-10 rounded-md'
                        src='/images/ptt.png'
                        alt='kargo'
                        height={40}
                        width={40}
                      />

                      <div className='ml-2'>
                        <span className='text-md font-semibold'>PTT</span>
                        <br />
                        <span className='text-xs'>1-3 İş günü </span>
                      </div>
                    </div>
                    <span className='text-lg'>₺28</span>
                  </div>
                </div>

                <div className='flex items-center justify-between px-2 '>
                  <button className='font-medium border rounded px-2 py-2 min-w-full '>
                    Düzenle
                  </button>
                </div>
              </div>
            </div>
            <div className='flex-1 my-4 mr-1  bg-white text-gray-600 rounded overflow-hidden shadow-lg border'>
              <div className='mx-4 my-2'>
                <div className=' flex justify-between h-6  text-gray-600 font-medium'>
                  <span className='px-2 text-sm font-semibold'>Ödeme</span>
                </div>
                <div className=' text-xs'>
                  <div className='flex pt-4 justify-between'>
                    <div className='flex w-42 h-16 px-4'>
                      <Image
                        className='w-10 h-10 rounded-md'
                        src='/images/paytr.png'
                        alt='kargo'
                        height={40}
                        width={40}
                      />

                      <div className='ml-2'>
                        <span className='text-md font-semibold'>PayTR</span>
                        <br />
                        <span className='text-xs'>12 Taksit %0 </span>
                      </div>
                    </div>
                    <span className='text-lg'>12 Taksit %0</span>
                  </div>
                </div>
                <div className=' text-xs'>
                  <div className='flex justify-between'>
                    <div className='flex w-42 h-16 px-4'>
                      <Image
                        className='w-10 h-10 rounded-md'
                        src='/images/paynet.png'
                        alt='kargo'
                        height={40}
                        width={40}
                      />

                      <div className='ml-2'>
                        <span className='text-md font-semibold'>Paynet</span>
                        <br />
                        <span className='text-xs'>6 Taksit %6 </span>
                      </div>
                    </div>
                    <span className='text-lg'>6 Taksit %6</span>
                  </div>
                </div>
                <div className=' text-xs'>
                  <div className='flex justify-between'>
                    <div className='flex w-42 h-16 px-4'>
                      <Image
                        className='w-10 h-10 rounded-md'
                        src='/images/iyzico.png'
                        alt='kargo'
                        height={40}
                        width={40}
                      />

                      <div className='ml-2'>
                        <span className='text-md font-semibold'>İyzico</span>
                        <br />
                        <span className='text-xs'>Tek Çekim %2 </span>
                      </div>
                    </div>
                    <span className='text-lg'>Tek Çekim %2</span>
                  </div>
                </div>
                <div className=' text-xs'>
                  <div className='flex justify-between'>
                    <div className='flex w-42 h-16 px-4'>
                      <Image
                        className='w-10 h-10 rounded-md'
                        src='/images/bank.jpg'
                        alt='kargo'
                        height={40}
                        width={40}
                      />

                      <div className='ml-2'>
                        <span className='text-md font-semibold'>
                          Havale/EFT
                        </span>
                        <br />
                        <span className='text-xs'>İndirim %5 </span>
                      </div>
                    </div>
                    <span className='text-lg'>İndirim %5 </span>
                  </div>
                </div>

                <div className='flex items-center justify-between px-2 '>
                  <button className='font-medium border rounded px-2 py-2 min-w-full '>
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
                    {orderProductState.response &&
                      orderProductState.result.map((order) => {
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
                                <div className='text-base font-semibold'>
                                  {order.fullName}
                                </div>
                                <div className='font-normal text-gray-500'>
                                  <span className='text-xs'>
                                    {order.telephone}
                                  </span>
                                </div>
                              </div>
                            </th>

                            <td className='px-6 py-1'>
                              <span className='text-xs'>
                                {order.date_added}
                              </span>
                            </td>
                            <td className='px-6 py-1'>
                              <div className='flex items-center'>
                                <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>{' '}
                                {order.status ? order.status : 'Durumumuz Yok'}
                              </div>
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
          {/* <button className='w-24 ml-2 pl-2 pr-2 py-1 rounded-sm flex items-center text-sm font-medium text-white bg-green-600 hover:bg-green-500'>
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
          </button> */}

          <select
            className={`${
              product?.status ? 'bg-green-500' : 'bg-red-500'
            } border border-gray-300 text-white text-xl rounded-sm focus:ring-green-500 focus:border-green-500 block w-24 ml-2 p-2.5 `}
            name='status'
            id='status'
            value={product?.status.toString()}
            onChange={(e) => handleChange(e)}
          >
            <option value={true}>Aktif</option>
            <option value={false}>Kapalı</option>
          </select>
          {/* Product Info */}
          <div className='mx-2 my-2 bg-white text-gray-600 max-w-sm rounded overflow-hidden shadow-lg'>
            <div className=' flex justify-between h-10 border text-gray-600 font-medium'>
              <span className='px-2 py-2 font-semibold'>Ürün Bilgileri</span>
            </div>
            <div className=' border-r py-4 border-l text-xs'>
              <div className='flex justify-between pl-2 pt-2 px-4'>
                <span className=' font-medium'>Link:</span>
                <span className='ml-12'>
                  <Link
                    href={`/urun/${product?.keyword}`}
                    className=' flex items-center font-semibold text-blue-500'
                    target='_blank'
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
                  </Link>
                </span>
              </div>
              <div className='flex items-center justify-between px-2  pt-2'>
                <span className='font-medium '>Ürün Adı:</span>
                <span className=' pr-2'>{product?.name}</span>
              </div>
              <div className='flex items-center justify-between px-2 pt-3 '>
                <span className='font-medium'>Ürün Kodu:</span>
                <span className=' pr-2'>
                  {product?.productCode !== '' ? product?.productCode : ''}
                </span>
              </div>
              <div className='flex items-center justify-between px-2 pt-3 '>
                <span className='font-medium'>SKU:</span>
                <span className=' pr-2'>
                  {product?.sku !== '' ? product?.sku : ''}
                </span>
              </div>
              <div className='flex items-center justify-between px-2 pt-3 '>
                <span className='font-medium'>Stok:</span>
                <span className=' pr-2'>
                  {product?.quantity !== '' ? product?.quantity : ''}
                </span>
              </div>
              <div className='flex items-center justify-between px-2 pt-3 '>
                <span className='font-medium'>Vergi:</span>
                <span className=' pr-2'>
                  {product?.tax_classes !== undefined
                    ? product?.tax_classes.map((tax) => tax.title)
                    : ''}
                </span>
              </div>

              <div className='flex items-center justify-between px-2 pt-4 '>
                <span className='font-medium'>Fiyat:</span>
                <span className=' pr-2'>
                  ₺{Number(product?.price).toFixed(2)}
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
                onClick={() => setProductDataEditModal(true)}
              >
                Düzenle
              </button>
            </div>
          </div>
          {/* Meta */}
          <div className='mx-2 my-2 bg-white text-gray-600 max-w-sm rounded overflow-hidden shadow-lg'>
            <div className=' flex justify-between h-10 border text-gray-600 font-medium'>
              <span className='px-2 py-2 font-semibold'>Meta Ayarları</span>
              <span className='px-2 py-2 font-light'>SEO Ayarları</span>
            </div>
            <div className=' border-r py-4 border-l text-xs'>
              <div className='flex justify-between pl-2 pt-2 px-4'>
                <span className=' font-medium'>Meta Başlığı:</span>
                <span className='ml-12 line-clamp-1'>
                  {product?.meta_title}
                </span>
              </div>
              <div className='flex justify-between pl-2 pt-2 px-4'>
                <span className=' font-medium'>Meta Açıklaması:</span>
                <span className='ml-24 line-clamp-1'>
                  {product?.meta_description}
                </span>
              </div>
              <div className='flex justify-between pl-2 pt-2 px-4'>
                <span className=' font-medium'>Meta Kelimeleri:</span>
                <span className='ml-12 line-clamp-1'>
                  {product?.meta_keyword}
                </span>
              </div>
              <div className='flex justify-between pl-2 pt-2 px-4'>
                <span className=' font-medium'>Ürün Etiketleri:</span>
                <span className='ml-12 line-clamp-1'>{product?.tag}</span>
              </div>
              <div className='flex justify-between pl-2 pt-2 px-4'>
                <span className=' font-medium'>Slug (SEO Link):</span>
                <span className='ml-12 line-clamp-1'>
                  {product !== undefined && product?.keyword}
                </span>
              </div>
            </div>
            <div className=' border text-xs pl-2 pt-2'>
              <button
                type='button'
                className=' text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
                onClick={() => setProductMetaEditModal(true)}
              >
                Düzenle
              </button>
            </div>
          </div>
          {/* Category */}
          <div className='mx-2 my-2 bg-white text-gray-600 max-w-sm rounded overflow-hidden shadow-lg'>
            <div className=' flex justify-between h-10 border text-gray-600 font-medium'>
              <span className='px-2 py-2 font-semibold'>
                Ürünün Kategorileri
              </span>
            </div>
            <div className=' border-r py-4 border-l text-xs'>
              <div className='flex items-center justify-between px-2'>
                <div className=' items-center flex-wrap'>
                  {product?.categories?.map((category) => {
                    return (
                      <div className='space-y-0' key={category.ID}>
                        <br />
                        <span className=' text-xl'>.</span>
                        <span className='bg-green-100 text-green-800 text-xs font-medium py-1.5 px-2.5 mx-2 rounded border border-green-400'>
                          {category.path}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className=' border text-xs pl-2 pt-2'>
              <button
                type='button'
                className=' text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
                onClick={() => setProductCategoryEditModal(true)}
              >
                Düzenle
              </button>
            </div>
          </div>
          {/* Secenekler */}
          <div className='mx-2 my-2 bg-white text-gray-600 max-w-sm rounded overflow-hidden shadow-lg'>
            <div className=' flex justify-between h-10 border text-gray-600 font-medium'>
              <span className='px-2 py-2 font-semibold'>
                Ürünün Seçenekleri
              </span>
            </div>
            <div className=' border-r py-4 border-l text-xs'>
              <div className='flex  justify-between px-2'>
                <div className='flex flex-wrap pt-2'>
                  {product?.product_options !== undefined &&
                    product?.product_options?.map((option) => {
                      return (
                        <div
                          key={option.optionId}
                          className='flex justify-between pl-2 pt-2 px-4 my-2'
                        >
                          <span className='font-medium'>
                            {
                              // option.optionId
                              options?.find((opt) => opt.ID === option.optionId)
                                .name
                            }
                            :
                          </span>
                          <span className='ml-12 line-clamp-1'>
                            {option?.product_option_values?.map(
                              (key, index) => {
                                return (
                                  <div
                                    key={index}
                                    className='flex items-center justify-between pt-2 '
                                  >
                                    <span className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded  border border-blue-400 '>
                                      {
                                        options
                                          ?.find(
                                            (opt) => opt.ID === option.optionId
                                          )
                                          .values.find(
                                            (val) => val.ID == key.optionValueId
                                          ).name
                                      }
                                    </span>
                                  </div>
                                );
                              }
                            ) || ''}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className=' border text-xs pl-2 pt-2'>
              <button
                type='button'
                className=' text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
                onClick={() => setProductOptionEditModal(true)}
              >
                Düzenle
              </button>
            </div>
          </div>
          {/* Attribute */}
          <div className='mx-2 my-2 max-w-sm bg-white rounded overflow-hidden shadow-lg'>
            <div className='flex justify-between h-10 bg-white border-b border-gray-200'>
              <span className='px-4 py-2 font-semibold text-gray-600'>
                Ürünün Özellikleri
              </span>
            </div>
            <table className='min-w-full leading-normal'>
              <tbody>
                {product?.attributes?.map((attribute, index) => (
                  <tr
                    key={index}
                    className='border-b border-gray-200 hover:bg-gray-100'
                  >
                    <td className='border-r border-gray-200 px-4 py-2 text-gray-600 text-xs'>
                      <span className='font-medium'>{attribute.name}:</span>
                    </td>
                    <td className='px-4 py-2 text-gray-600 text-xs'>
                      <span className='ml-12 line-clamp-1'>
                        {attribute?.value || ''}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='px-4 py-3 bg-white'>
              <button
                type='button'
                className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
                onClick={() => setProductAttributeEditModal(true)}
              >
                Düzenle
              </button>
            </div>
          </div>

          {/* Pazaryeri Card */}
          {/* <div className='mx-2 my-2 bg-white text-gray-600 max-w-sm rounded overflow-hidden shadow-lg'>
            <div className=' flex justify-between h-10 border text-gray-600 font-medium'>
              <span className='px-2 py-2 font-semibold'>Trendyol</span>
              <span className='px-2 font-semibold text-blue-500'>
                <button
                  className={`w-24 ml-2 pl-2 pr-2 py-2 rounded-sm flex items-center text-sm font-medium text-white ${
                    product?.product_pazaryeri !== undefined &&
                    product?.product_pazaryeri[1]?.satisdurumu > 0
                      ? 'bg-green-600  hover:bg-green-500'
                      : 'bg-red-600  hover:bg-red-500'
                  } `}
                >
                  <span className=' px-4 pr-1'>
                    {product?.product_pazaryeri !== undefined &&
                    product?.product_pazaryeri[1]?.satisdurumu > 0
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
              <div className='flex items-center justify-between px-2 pt-4 '>
                <span className='font-medium'>Barkod:</span>
                <span className=' pr-2'>
                  {product?.product_pazaryeri !== undefined &&
                    product?.product_pazaryeri[1]?.barkod}
                </span>
              </div>
              <div className='flex items-center justify-between px-2  pt-2'>
                <span className='font-medium '>Trendyol Siparişleri:</span>
                <span className=' pr-2'>22</span>
              </div>
              <div className='flex items-center justify-between px-2 pt-4 '>
                <span className='font-medium'>Liste Fiyatı:</span>
                <span className=' pr-2'>
                  ₺
                  {product?.product_pazaryeri !== undefined &&
                    product?.product_pazaryeri[1]?.listefiyati}
                </span>
              </div>
              <div className='flex items-center justify-between px-2 pt-4 '>
                <span className='font-medium'>Satış Fiyatı:</span>
                <span className=' pr-2'>
                  ₺
                  {product?.product_pazaryeri !== undefined &&
                    product?.product_pazaryeri[1]?.satisfiyati}
                </span>
              </div>
              <div className='flex items-center justify-between px-2 pt-4 '>
                <span className='font-medium'>Kargo Ücreti:</span>
                <span className=' pr-2'>
                  ₺
                  {product?.product_pazaryeri !== undefined &&
                    product?.product_pazaryeri[1]?.kargoucreti}
                </span>
              </div>
              <div className='flex items-center justify-between px-2 pt-4 '>
                <span className='font-medium'>Marka:</span>
                <span className=' pr-2'>
                  {product?.product_pazaryeri !== undefined &&
                    product?.product_pazaryeri[1]?.pazaryerimarkaadi}
                </span>
              </div>
              <div className='flex items-center justify-between px-2'>
                <span className='font-medium pt-2'>Kategori:</span>
                <div className='flex items-center justify-between pt-2'>
                  <span className='pr-2'>
                    {product?.product_pazaryeri !== undefined &&
                      product?.product_pazaryeri[1]?.pazaryerikategoriadi}
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
                onClick={() => setProductTrendyolEditModal(true)}
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
          {/* VIDEO */}
          <div className='mx-2 my-2 bg-white text-gray-600 max-w-sm rounded overflow-hidden shadow-lg'>
            <div className=' flex justify-between h-10 border text-gray-600 font-medium'>
              <span className='px-2 py-2 font-semibold'>Ürün Videosu</span>
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
                <span className=' font-medium'>Video:</span>
                <span className='ml-12'>
                  <a
                    href={
                      'https://www.youtube.com/watch?v=' + product?.video_link
                    }
                    target='_blank'
                    className=' flex items-center font-semibold text-blue-500'
                  >
                    Videoya Git
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

              <div className='flex justify-between pl-2 pt-2 px-4'>
                <span className=' font-medium'>Link :</span>
                <span className='ml-12'>
                  {'https://www.youtube.com/watch?v=' + product?.video_link}
                </span>
              </div>
            </div>
            <div className=' border text-xs pl-2 pt-2'>
              <button
                type='button'
                className=' text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
                onClick={() => setProductVideoEditModal(true)}
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

export default ProductComp;
