'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

const manufacturerJSON = {
  pazaryerleri: [],
  manufacturer_pazaryeri: {},
  manufacturer_id: '',
  name: '',
  sort_order: '',
  keyword: '',
  image: '',
  thumb: '',
  placeholder: 'http://demo.actsistem.com/image/cache/no_image-100x100.png',
};

function AddNewManufacturerModal(props) {
  const [manufacturer, setManufacturer] = useState(manufacturerJSON);
  const [isUpdate, setIsUpdate] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setManufacturer((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const images = Array.from(e.target.files);

    handleFileUpload(images);
  };

  const handleFileUpload = (newFiles) => {
    //setIsLoading(true);
    const formData = new FormData();
    newFiles.forEach((file, index) => {
      formData.append(`file[${index}]`, file);
      //formData.append(`file[]`, file);
    });

    // Handle validations
    axios({
      method: 'post',
      mode: 'no-cors',
      url: `http://demo.actsistem.com/api/v1/admin/index.php?route=catalog/product/uploader`,
      //url: `http://demo.actsistem.com/upload.php?directory=react_resim`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        console.log(response);
        setImage(response.data[0]);
        //setIsLoading(false);
        // Handle response
      })
      .catch((error) => {
        console.error(error);
        //setIsLoading(false);
        // Handle error
      });
  };

  const setImage = (imageURL) => {
    setManufacturer((prev) => ({
      ...prev,
      thumb: imageURL.thumb,
      image: imageURL.image,
    }));
  };

  const handleSubmit = (e) => {
    setSuccess(false);
    setIsUpdate(true);
    // Prevent the default submit and page reload
    e.preventDefault();

    console.log('MANUFACTURER EDİT GÖNDERİLEN DATA: ', manufacturer);

    // Handle validations
    axios({
      method: 'POST',
      mode: 'no-cors',
      url: `http://demo.actsistem.com/api/v1/admin/index.php?route=catalog/manufacturer/add`,
      data: manufacturer,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        console.log(response);
        setIsUpdate(false);
        setSuccess(true);
        if (!success) {
          console.log('success');
        }
      })
      .catch((error) => {
        console.error(error);
        setIsUpdate(false);
        setSuccess(false);
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
                    MARKA DÜZENLE
                  </h3>
                  <div>
                    <form
                      action=''
                      onSubmit={handleSubmit}
                      className='w-full mt-4 '
                    >
                      <div className='flex flex-wrap  -mx-3 mb-6'>
                        <div className=' px-3 w-2/1 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-first-name'
                          >
                            MARKA ADI
                          </label>
                          <input
                            value={manufacturer.name}
                            className='appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500'
                            name='name'
                            type='text'
                            placeholder='Marka Adı'
                            onChange={handleChange}
                          />
                        </div>
                        <div className='w-2/1 px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-first-name'
                          >
                            MARKA SIRALAMASI
                          </label>
                          <input
                            value={manufacturer.sort_order}
                            className='appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500'
                            name='sort_order'
                            type='text'
                            placeholder='Marka Sıralaması'
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className='relative my-1 rounded-md shadow-sm'>
                        <label
                          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-first-name'
                        >
                          MARKA RESMİ
                        </label>

                        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'></div>
                        {manufacturer.thumb != '' ? (
                          <Image
                            src={manufacturer.thumb}
                            alt='image'
                            width={100}
                            height={100}
                          ></Image>
                        ) : (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className={`w-16 h-16 mr-1 border border-gray-400 border-dashed cursor-pointer`}
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                            />
                          </svg>
                        )}
                        <input
                          type='file'
                          name='image'
                          multiple={false}
                          className=''
                          onChange={onFileChange}
                        />
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
                            location.reload();
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

export default AddNewManufacturerModal;
