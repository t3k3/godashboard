'use client';
import React, { useState } from 'react';
import slugify from 'slugify';
import { useRouter } from 'next/navigation';
import { addNewProduct } from '@/services/product';

const productJSON = {
  name: '',
  keyword: '',
  description: '',
  meta_title: '',
  meta_keyword: '',
  product_code: '',
};

function toSeoUrl(url) {
  return url
    .toString() // Convert to string
    .normalize('NFD') // Change diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
    .replace(/\s+/g, '-') // Change whitespace to dashes
    .toLowerCase() // Change to lowercase
    .replace(/&/g, '-and-') // Replace ampersand
    .replace(/[^a-z0-9\-]/g, '') // Remove anything that is not a letter, number or dash
    .replace(/-+/g, '-') // Remove duplicate dashes
    .replace(/^-*/, '') // Remove starting dashes
    .replace(/-*$/, ''); // Remove trailing dashes
}

function AddNewProductModal(props) {
  const { push } = useRouter();

  const [product, setProduct] = useState(productJSON);
  const [isUpdate, setIsUpdate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isKeywordManuallySet, setIsKeywordManuallySet] = useState(false);

  // const handleChange = (e) => {
  //   setProduct((prev) => {
  //     return {
  //       ...prev,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };

  const handleChange = (e) => {
    setProduct((prev) => {
      const updatedProduct = {
        ...prev,
        [e.target.name]: e.target.value,
      };

      // If the name field is updated and the keyword field is not manually set,
      // update the keyword field with the SEO-friendly version of the name
      if (e.target.name === 'name' && !isKeywordManuallySet) {
        updatedProduct.keyword = slugify(e.target.value, {
          lower: true,
          locale: 'tr',
        });
      }

      // If the keyword field is manually updated, set isKeywordManuallySet to true
      if (e.target.name === 'keyword') {
        setIsKeywordManuallySet(e.target.value !== '');
      }

      return updatedProduct;
    });
  };

  const handleSubmit = async (e) => {
    setSuccess(false);
    setIsUpdate(true);
    // Prevent the default submit and page reload
    e.preventDefault();

    console.log('PRODUCT EKLE GÖNDERİLEN DATA: ', product);

    const response = await addNewProduct(product);
    console.log('RESPONSE from PruductList: ', response);

    if (response.status === 201) {
      console.log(response);
      setIsUpdate(false);
      setSuccess(true);
      if (!success) {
        console.log('success');
        push('/admin/urunler/' + response?.data);
      }
    } else {
      console.log('Error! Ürün eklenemedi.');
      setIsUpdate(false);
      setSuccess(false);
    }
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
                    Ürün Ekle
                  </h3>
                  <div>
                    <form
                      action=''
                      onSubmit={handleSubmit}
                      className='w-full mt-4 '
                    >
                      <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-first-name'
                          >
                            Ürün Adı
                          </label>
                          <input
                            value={product.name}
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                            name='name'
                            type='text'
                            placeholder='Ürün Adı'
                            onChange={handleChange}
                          />
                          <p className='text-red-500 text-xs italic'>
                            Alan boş bırakılamaz.
                          </p>
                        </div>
                      </div>
                      <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-first-name'
                          >
                            *Ürün SEO Bağlantısı (Bu değer aynı zamanda ürünün
                            linkini oluşturur.)
                          </label>
                          <input
                            value={product.keyword}
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                            name='keyword'
                            type='text'
                            placeholder={'Örn: apple-iphone-14-pro-8-256'}
                            onChange={handleChange}
                          />
                          <p className='text-red-500 text-xs italic'>
                            Alan boş bırakılamaz.
                          </p>
                        </div>
                      </div>
                      <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3'>
                          <label
                            htmlFor='message'
                            className='block mb-2 text-sm font-medium text-gray-900'
                          >
                            Ürün Açıklaması
                          </label>
                          <textarea
                            value={product.description}
                            type='text'
                            rows='4'
                            name='description'
                            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Ürün Açıklaması...'
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      </div>
                      <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-first-name'
                          >
                            Ürün Meta Başlığı
                          </label>
                          <input
                            value={product.meta_title}
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                            name='meta_title'
                            type='text'
                            placeholder='Meta Başlığı'
                            onChange={handleChange}
                          />
                          <p className='text-red-500 text-xs italic'>
                            Alan boş bırakılamaz.
                          </p>
                        </div>
                      </div>
                      <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-first-name'
                          >
                            Ürün Kodu
                          </label>
                          <input
                            value={product.product_code}
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                            name='product_code'
                            type='text'
                            placeholder='Ürün Kodu'
                            onChange={handleChange}
                          />
                          <p className='text-red-500 text-xs italic'>
                            Alan boş bırakılamaz.
                          </p>
                        </div>
                      </div>
                      {/* <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-first-name'
                          >
                            Mevcut Kategoriler
                          </label>
                          <div className=' border-r py-4 border-l text-lg'>
                            <div className='flex items-center justify-between px-2'>
                              <div className='flex items-center flex-wrap pt-2 '>
                                {product?.product_categories.map((key) => {
                                  return (
                                    <div key={key.category_id} className='my-4'>
                                      <span className='bg-green-100 text-green-800 text-lg font-medium mr-2 px-2.5 py-4 rounded '>
                                        {key.name}
                                      </span>
                                      <span
                                        className='-ml-2 mr-4 px-2.5 py-4 rounded-sm cursor-pointer bg-green-200 border-l border-green-400  h-full w-8'
                                        onClick={() => {
                                          editProductCategory(key.category_id);
                                        }}
                                      >
                                        -
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      {/* <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3 mb-6 md:mb-0'>
                          <label
                            htmlFor='countries'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                          >
                            Select an option
                          </label>
                          <select
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            onChange={handleChangeOptions}
                          >
                            <option defaultValue={true} value={''}>
                              Bir Kategori Seçiniz
                            </option>
                            {categories?.map((category) => {
                              return (
                                <option
                                  key={category.category_id}
                                  value={category.category_id}
                                >
                                  {category.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div> */}
                      <p className='text-red-600 italic text-sm'>
                        Ürünün diğer ayarları bir sonrası adımda yapılabilir.
                      </p>
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
                          Kaydet
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

export default AddNewProductModal;
