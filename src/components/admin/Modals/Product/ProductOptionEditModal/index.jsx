'use client';
import React, { useState, useEffect } from 'react';
import { editProduct } from '@/services/product';

import {
  createVariants,
  getOptionFromClientSide,
  getOptions,
} from '@/services/option';
import ProductOptionEditModalItem from './ProductOptionEditModalItem';
import ProductOptionEditModalVariantsList from './ProductOptionEditModalVariants/ProductOptionEditModalVariantsList';

function ProductOptionEditModal(props) {
  const [product, setProduct] = useState(props.product);
  const [isUpdate, setIsUpdate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [options, setOptions] = useState();
  const [variantList, setVariantList] = useState();
  const [newCombination, setNewCombination] = useState(false);

  const localProductBackup = props.product;

  console.log('product4343: ', product);

  useEffect(() => {
    async function fetchOptions() {
      const { options } = await getOptions();
      setOptions(options);
    }
    fetchOptions();
  }, []);

  useEffect(() => {
    var setVar = product.product_combination;
    setVariantList(setVar);
  }, []);

  // useEffect(() => {
  //   createVariantsTest();
  // }, [variantList]);

  const handleChangeText = (e, option_value_id, option_id) => {
    const indOf_option_id = product.product_options.indexOf(
      product.product_options.find((opt) => opt.option_id === option_id)
    );

    const indOf_option_value_id = product.product_options[
      indOf_option_id
    ].product_option_value.indexOf(
      product.product_options[indOf_option_id].product_option_value.find(
        (opt) => opt.option_value_id === option_value_id
      )
    );

    const temp = { ...product };

    if (e.target.name === 'price_prefix') {
      console.log('name: ', e.target.name);
      console.log('value: ', e.target.value);
    }

    temp.product_options[indOf_option_id].product_option_value[
      indOf_option_value_id
    ] = {
      ...temp.product_options[indOf_option_id].product_option_value[
        indOf_option_value_id
      ],
      [e.target.name]: e.target.value,
    };

    setProduct(temp);
  };

  function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.attribute_id === id);

    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }

    return arr;
  }

  const editProductOption = (option_id) => {
    console.log('i am editProductOption from ProductOptionEditModal');
    // const sp = removeObjectWithId(product.product_options, option_id);
    // setProduct((prev) => {
    //   return {
    //     ...prev,
    //     product_options: sp,
    //   };
    // });
    // console.log('PRODUCT FROM EditProductOption: ', product);
  };

  const handleChangeOptions = (e) => {
    if (e.target.value !== '') {
      var item = options.find((item) => item.ID === Number(e.target.value));
      if (!product?.product_options?.some((it) => it.optionId === item.ID)) {
        console.log('item: ', item);
        let x = {
          optionId: item.ID,
          name: item.name,
          type: item.type,
          required: 1,
          product_option_values: [],
        };

        setProduct((prev) => {
          return {
            ...prev,
            ...prev.product_options.push(x),
          };
        });
      }
    }
  };

  const createVariantsTest = async (e) => {
    console.log(
      'createVariantsTest GÖNDERİLEN PRODUCT DATA: ',
      product.product_options
    );

    const x = [];
    product.product_options.map((opt, index) => {
      x[index] = opt.product_option_values.map((val) => val.optionValueId);
    });

    var datx = {};

    datx.combinations = x;

    // if (product.product_combination !== [] && newCombination === false) {
    //   console.log('1');
    //   datx.current = { ...product.product_combination };
    // }

    // datx.current = { ...variantList };

    console.log('datx1 giden: ', datx);
    // console.log('DAT: ', dat);
    // console.log('XXX: ', x);

    // Handle validations

    // Handle validations
    // console.log('ÜRÜN EDİTİNDEN GÖNDERİLEN PRODUCT DATA:: ', product);
    // Handle validations

    const response = await createVariants(datx);

    if (response.status === 200) {
      setVariantList(response.data.data);
      setNewCombination(true);
    }
    setIsUpdate(false);

    // axios({
    //   method: 'POST',
    //   mode: 'no-cors',
    //   url: `http://demo.actsistem.com/api/v1/admin/index.php?route=catalog/combination/optionRender`,
    //   data: datx,
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // }).then((response) => {
    //   console.log(response);
    //   setVariantList(response.data);
    //   setNewCombination(true);

    //   // Handle response
    // });
  };

  const handleSubmit = async (e) => {
    setSuccess(false);
    setIsUpdate(true);
    // Prevent the default submit and page reload
    e.preventDefault();

    let temp = { ...product };
    temp.product_combination = variantList;

    // console.log('BEFORE SECENEKLERDEN GÖNDERİLEN PRODUCT DATA:: ', product);
    //setProduct(temp);

    // console.log('AFTER SECENEKLERDEN GÖNDERİLEN PRODUCT DATA:: ', product);
    console.log('TEMP: ', temp);

    // Handle validations
    console.log('ÜRÜN EDİTİNDEN GÖNDERİLEN PRODUCT DATA:: ', product);
    // Handle validations

    const response = await editProduct(temp, product.urunId);

    //TODO: Response Status 201 olmalı.
    if (response.status === 200) {
      console.log(response);
      setIsUpdate(false);
      setSuccess(true);
      if (!success) {
        props.setProduct(product);
      }
    }
    setIsUpdate(false);

    // Handle validations
    // axios({
    //   method: 'POST',
    //   mode: 'no-cors',
    //   url: `http://demo.actsistem.com/api/v1/admin/index.php?route=catalog/product/edit&product_id=${product.urunId}`,
    //   data: temp,
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // })
    //   .then((response) => {
    //     console.log(response);
    //     setIsUpdate(false);
    //     setSuccess(true);
    //     if (!success) {
    //       props.setProduct(product);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setIsUpdate(false);
    //     setSuccess(false);
    //   });
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
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl resize'>
            <div className=' px-4 bg-white pb-4 pt-5 sm:p-6 sm:pb-4 '>
              <div className='sm:flex sm:items-start '>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left  w-full'>
                  <h3
                    className='text-base font-semibold leading-6 text-gray-600  border-b'
                    id='modal-title'
                  >
                    Seçenekleri Düzenle
                  </h3>

                  <div>
                    <form
                      action=''
                      method='post'
                      onSubmit={handleSubmit}
                      className='w-full mt-4 '
                    >
                      <div className='flex flex-wrap -mx-3 mt-8 mb-6'>
                        <div className='w-full px-3 mb-3 mt-2 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-first-name'
                          >
                            Mevcut Seçenekler
                          </label>
                          <div className=' text-lg'>
                            <div className='flex items-center justify-between px-2'>
                              <div className=' items-center flex-wrap w-full '>
                                {product?.product_options !== undefined &&
                                  options !== undefined &&
                                  product?.product_options?.map(
                                    (productOption, index) => {
                                      return (
                                        <ProductOptionEditModalItem
                                          key={index}
                                          options={options}
                                          product={product}
                                          productOption={productOption}
                                          editProductOption={editProductOption}
                                          handleChangeText={handleChangeText}
                                          createVariantsTest={
                                            createVariantsTest
                                          }
                                        />
                                      );
                                    }
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-wrap  mb-6 '>
                        <div className='w-full px-2 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-first-name'
                          >
                            YENİ SEÇENEK EKLE
                          </label>
                          <select
                            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            onChange={handleChangeOptions}
                          >
                            <option defaultValue={true} value={''}>
                              Bir Seçenek Seçiniz
                            </option>
                            {console.log(options)}
                            {options?.map((option) => {
                              return (
                                <option key={option.ID} value={option.ID}>
                                  {option.name}
                                </option>
                              );
                            })}
                          </select>
                          <p className='text-xs text-blue-600 mt-4 mx-8'>
                            Daha onceden seçenekler sayfasinda tanimlanan
                            seçenekler eklenebilir. Aradiginiz seçenek yoksa
                            seçenekler sayfasindan ekleyiniz.{' '}
                          </p>
                        </div>
                      </div>

                      <div className=' flex flex-row-reverse'>
                        <span
                          className='flex flex-row-reverse bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium mb-12 mr-6 px-2.5 py-2.5 rounded  border border-blue-300 cursor-pointer'
                          onClick={(e) => createVariantsTest(e)}
                        >
                          Variantları Oluştur
                        </span>
                      </div>

                      {variantList && (
                        <ProductOptionEditModalVariantsList
                          variantList={variantList}
                          options={options}
                          setVariantList={setVariantList}
                        />
                      )}
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
                            window.location.reload();
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

export default ProductOptionEditModal;
