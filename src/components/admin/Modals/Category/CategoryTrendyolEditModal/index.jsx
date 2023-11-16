'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductTrendyolEditModalSelect from './ProductTrendyolEditModalSelect';

import ProductTrendyolEditModalCategoriesSelect from './ProductTrendyolEditModalCategoriesSelect';

function getData() {
  const res = fetch('http://localhost:3000/product.json');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

// async function getDataCategoryAttributes(id) {
//   const res = await fetch(
//     `http://havuz.actsistem.com/index.php?route=Ozellikler&pas=gs734jd&PazaryeriId=1&PKategoriId=${id}`
//   );
//   // const res = await fetch(
//   //   `http://havuz.actsistem.com/index.php?route=Ozellikler&pas=gs734jd&PazaryeriId=1&PKategoriId=2978`
//   // );
//   //Recommendation: handle errors
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }

// async function getDataCategoryAttributesValues(id) {
//   await axios
//     .get(
//       `http://havuz.actsistem.com/index.php?route=Ozelliklerdegerleri&pas=gs734jd&PazaryeriId=1&Attributeid=${id}&PKategoriId=2978`
//     )
//     .then((response) => {
//       console.log(response.data);
//       return response.data;
//       // console.log(response.status);
//       // console.log(response.statusText);
//       // console.log(response.headers);
//       // console.log(response.config);
//     });
// }

function ProductTrendyolEditModal({ urunId, closeModal }) {
  const [product, setProduct] = useState();
  const [attributes, setAttributes] = useState();
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/product.json')
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);

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
    // Prevent the default submit and page reload
    e.preventDefault();

    // Handle validations
    axios({
      method: 'post',
      url: 'http://demo.actsistem.com/deneme.php',
      data: product,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((response) => {
      console.log(response);
      // Handle response
    });
  };

  return (
    <div
      className='relative z-10'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
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
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            name='jan'
                            type='text'
                            value={
                              product?.product_pazaryeri[1].kargoucreti || ''
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
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            name='isbn'
                            type='text'
                            value={
                              product?.product_pazaryeri[1].listefiyati || ''
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
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            name='mpn'
                            type='text'
                            value={
                              product?.product_pazaryeri[1].satisfiyati || ''
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
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            name='jan'
                            type='text'
                            value={product?.product_pazaryeri[1].barkod || ''}
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
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            name='isbn'
                            type='text'
                            value={
                              product?.product_pazaryeri[1].pazaryerimarkaadi ||
                              ''
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
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            name='mpn'
                            type='text'
                            value={
                              product?.product_pazaryeri[1].satisdurumu || ''
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
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
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
                              className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
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
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
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
                                    ? product?.product_pazaryeri[1].ozellikler
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
                          className='inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto'
                        >
                          Güncelle
                        </button>
                        <button
                          onClick={() => {
                            closeModal(false);
                          }}
                          className='mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:mt-0 sm:w-auto'
                        >
                          İptal
                        </button>
                      </div>
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
