'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

async function getData() {
  const res = await fetch('http://localhost:3000/kategori.json');
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

Object.byString = function (o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, ''); // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};

function KategoriEditModal({ kategoriId, closeModal }) {
  const [kategori, setKategori] = useState();
  const [kategoriName, setKategoriName] = useState('Elekt');
  const [kategoriLangId, setkategoriLangId] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await getData();
      setKategori(response);
    }
    fetchData();
  }, []);

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
    setKategori((prev) => {
      return {
        ...prev,
        category_description: {
          5: {
            ...prev.category_description[5],
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
      method: 'POST',
      mode: 'no-cors',
      url: 'http://demo.actsistem.com/test.php?cht=Ankara',
      data: { slm: 'Merhaba12345' },
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
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                  <h3
                    className='text-base font-semibold leading-6 text-gray-600  border-b'
                    id='modal-title'
                  >
                    Kategori Düzenle
                  </h3>
                  <div>
                    <form
                      action=''
                      id='login'
                      method='post'
                      onSubmit={handleSubmit}
                      className='w-full max-w-lg mt-4'
                    >
                      <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-first-name'
                          >
                            Kategori Adı
                          </label>
                          <input
                            value={kategori?.category_description[5].name || ''}
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                            name='name'
                            type='text'
                            placeholder='Elektronik'
                            onChange={handleChange}
                          />
                          <p className='text-red-500 text-xs italic'>
                            Alan boş bırakılamaz.
                          </p>
                        </div>
                        <div className='w-full md:w-1/2 px-3'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-last-name'
                          >
                            Slug (Seo URL)
                          </label>
                          <input
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            type='text'
                            name='keyword'
                            value={kategori?.keyword || ''}
                            placeholder='elektronik'
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
                            Alan1
                          </label>
                          <input
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            name='text_name'
                            type='text'
                            placeholder='Alan1'
                            value={kategori?.text_name || ''}
                            onChange={handleChange}
                          />
                        </div>
                        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-state'
                          >
                            Üst kategori
                          </label>
                          <div className='relative'>
                            <select
                              className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                              id='grid-state'
                            >
                              <option>Elektronik</option>
                              <option>Bilgisayar</option>
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
                            Alan2
                          </label>
                          <input
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            id='grid-zip'
                            type='text'
                            placeholder='Alan2'
                          />
                        </div>
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

export default KategoriEditModal;
