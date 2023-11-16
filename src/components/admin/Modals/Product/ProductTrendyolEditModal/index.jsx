'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductTrendyolEditModalSelect from './ProductTrendyolEditModalSelect';

import ProductTrendyolEditModalCategoriesSelect from './ProductTrendyolEditModalCategoriesSelect';
import Link from 'next/link';

function ProductTrendyolEditModal(props) {
  console.log('READ PRODUCT FROM TRENDYOL: ', props.product);
  const [product, setProduct] = useState(props.product);
  const [isUpdate, setIsUpdate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [attributes, setAttributes] = useState();
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   async function fetchAttributes() {
  //     const response = await getDataCategoryAttributes();
  //     setAttributes(response);
  //   }
  //   fetchAttributes();
  // }, []);

  const getCategoryAttributes = (id) => {
    fetch(
      `http://havuz.actsistem.com/index.php?route=Ozellikler&pas=gs734jd&PazaryeriId=1&PKategoriId=${id}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAttributes(data);
      });
    //console.log('attributesValues : ', attributesValues);
  };

  // categories?.map((category) => {
  //   console.log('Categories: ', category?.name);
  // });

  // const handleChange = (e) => {
  //   setKategori((prev) => {
  //     return {
  //       ...prev,
  //       category_description: {
  //         5: {
  //           ...prev.category_description[5],
  //           [e.target.name]: e.target.value,
  //         },
  //       },
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  //   console.log(kategori);
  // };

  const handleChange = (e) => {
    setProduct((prev) => {
      return {
        ...prev,
        product_description: {
          5: {
            ...prev.product_description[5],
            [e.target.name]: e.target.value,
          },
        },
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    setSuccess(false);
    setIsUpdate(true);
    // Prevent the default submit and page reload
    e.preventDefault();

    // Handle validations
    axios({
      method: 'post',
      mode: 'no-cors',
      url: 'http://demo.actsistem.com/deneme.php',
      data: product,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((response) => {
      console.log(response);
      setIsUpdate(false);
      setSuccess(true);
      props.setProduct(product);
      // Handle response
    });
  };

  return (
    <div
      className='relative z-50'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-50 overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl resize'>
            <div className=' px-4 bg-white pb-4 pt-5 sm:p-6 sm:pb-4 '>
              <div className='sm:flex sm:items-start '>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left  w-full'>
                  <h3
                    className='text-base font-semibold leading-6 text-gray-600  border-b'
                    id='modal-title'
                  >
                    Trendyol Ayarları
                  </h3>
                  <div>
                    <form
                      action=''
                      id='login'
                      method='post'
                      onSubmit={handleSubmit}
                      //onKeyDown="return event.key != 'Enter';"
                      className='w-full mt-4 '
                    >
                      <div className='flex flex-wrap -mx-3 mb-2'>
                        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-city'
                          >
                            Kargo Ücreti
                          </label>
                          <input
                            className='appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            name='jan'
                            type='text'
                            value={
                              product?.product_pazaryeri[1]?.kargoucreti || ''
                            }
                            onChange={handleChange}
                          />
                        </div>

                        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-zip'
                          >
                            Liste Fiyatı
                          </label>
                          <input
                            className='appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            name='isbn'
                            type='text'
                            value={
                              product?.product_pazaryeri[1]?.listefiyati || ''
                            }
                            onChange={handleChange}
                          />
                        </div>
                        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-zip'
                          >
                            Satış Fiyatı
                          </label>
                          <input
                            className='appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            name='mpn'
                            type='text'
                            value={
                              product?.product_pazaryeri[1]?.satisfiyati || ''
                            }
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className='flex flex-wrap -mx-3 mb-2'>
                        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-city'
                          >
                            Barkod
                          </label>
                          <input
                            className='appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            name='jan'
                            type='text'
                            value={product?.product_pazaryeri[1]?.barkod || ''}
                            onChange={handleChange}
                          />
                        </div>

                        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-zip'
                          >
                            Marka
                          </label>
                          <input
                            className='appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            name='isbn'
                            type='text'
                            value={
                              product?.product_pazaryeri[1]
                                ?.pazaryerimarkaadi || ''
                            }
                            onChange={handleChange}
                          />
                        </div>
                        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-zip'
                          >
                            Pazar Yeri Durumu
                          </label>
                          <input
                            className='appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            name='mpn'
                            type='text'
                            value={
                              product?.product_pazaryeri[1]?.satisdurumu || ''
                            }
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* TRENDYOL KATEGORİLERİ */}

                      <div className='flex flex-wrap -mx-3 mb-6'>
                        {product !== undefined && (
                          <ProductTrendyolEditModalCategoriesSelect
                            product={product}
                            selected={selected}
                            setSelected={setSelected}
                          />
                        )}
                      </div>

                      {/* <div className='mb-4'>Zorunlu Özellikler</div>
                      <div className='flex flex-wrap -mx-3 mb-2'>
                        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-zip'
                          >
                            STOK
                          </label>
                          <input
                            className='appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            name='quantity'
                            type='text'
                            value={product?.quantity || ''}
                            onChange={handleChange}
                          />
                        </div>
                        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-zip'
                          >
                            KDV
                          </label>
                          <div className='relative'>
                            <select
                              className='block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                              id='grid-state'
                            >
                              {product?.tax_classes.map((tax) => {
                                return (
                                  <option key={tax.tax_class_id}>
                                    {tax.title}
                                  </option>
                                );
                              }) || ''}
                            </select>
                            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                              <svg
                                className='fill-current h-4 w-4'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                              >
                                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-zip'
                          >
                            FİYAT
                          </label>
                          <input
                            className='appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            name='price'
                            type='text'
                            value={Number(product?.price).toFixed(2) || ''}
                            onChange={handleChange}
                          />
                        </div>
                      </div> */}

                      <div className='py-3 '>
                        <span
                          type='button'
                          className='inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto cursor-pointer'
                          onClick={() => {
                            getCategoryAttributes(selected?.cid);
                          }}
                        >
                          Özellikleri Göster
                        </span>
                        <p className='text-gray-500 block text-xs italic sm:ml-3 mt-1'>
                          Pazaryerinin zorunlu tuttuğu özellikler{' '}
                          <span className='text-red-600 font-bold'>
                            kırmızı
                          </span>{' '}
                          ile vurgulanmıştır. Diğer özellikler opsiyoneldir.
                        </p>
                      </div>
                      <div className='mt-6'>Kategori Özellikleri</div>

                      <div className='flex flex-wrap -mx-3 mb-2'>
                        {product !== undefined &&
                          attributes?.map((attribute) => {
                            return (
                              <ProductTrendyolEditModalSelect
                                key={attribute.attributeid}
                                attribute={attribute}
                                product={
                                  product !== undefined
                                    ? product?.product_pazaryeri[1]?.ozellikler
                                    : false
                                }
                                selectedCategory={selected}
                              />
                            );

                            // console.log('XXXXXXXXXXXXX : ' + JSON.stringify(x));
                          })}

                        {/* {product !== undefined &&
                          attributes?.map((attribute) => {
                            // console.log(
                            //   'ATTIBUTEEEEEE : ' + JSON.stringify(attribute)
                            // );
                            var x = '';
                            product?.product_pazaryeri[1].ozellikler[
                              attribute.attributeid
                            ].id === attribute.attributeid
                              ? (x =
                                  product?.product_pazaryeri[1].ozellikler[
                                    attribute.attributeid
                                  ])
                              : (x = '');

                            // console.log('XXXXXXXXXXXXX : ' + JSON.stringify(x));

                            return (
                              <ProductTrendyolEditModalSelect
                                key={attribute.attributeid}
                                attribute={attribute}
                                product={x}
                              />
                            );
                          })} */}
                      </div>

                      <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                        <button
                          type='submit'
                          disabled={isUpdate}
                          className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto ${
                            isUpdate
                              ? 'bg-gray-400'
                              : 'bg-green-600 hover:bg-green-500'
                          } `}
                        >
                          Güncelle
                          {isUpdate && (
                            <div role='status'>
                              <svg
                                aria-hidden='true'
                                className='w-5 h-5 mx-2 text-gray-200 animate-spin fill-blue-600'
                                viewBox='0 0 100 101'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                  fill='currentColor'
                                />
                                <path
                                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                  fill='currentFill'
                                />
                              </svg>
                              <span className='sr-only'>Loading...</span>
                            </div>
                          )}
                        </button>

                        <button
                          onClick={() => {
                            props.closeModal(false);
                          }}
                          className='mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:mt-0 sm:w-auto'
                        >
                          Kapat
                        </button>
                      </div>
                      {success && (
                        <div
                          className='flex p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 '
                          role='alert'
                        >
                          <svg
                            aria-hidden='true'
                            className='flex-shrink-0 inline w-5 h-5 mr-3'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fillRule='evenodd'
                              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                              clipRule='evenodd'
                            ></path>
                          </svg>
                          <span className='sr-only'>Info</span>
                          <div>
                            <span className='font-medium'>Başarılı!</span>{' '}
                            Değişikler başarılı bir şekilde kaydedildi.
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTrendyolEditModal;
