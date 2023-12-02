'use client';
import React, { useState } from 'react';
import { editOrderHistory } from '@/services/order';

function OrderHistoryEditModal({ orderId, selectedStatus, closeModal }) {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [success, setSuccess] = useState(false);

  console.log('ORDERID456: ', orderId);
  console.log('selectedStatus456: ', selectedStatus);

  const handleChange = (e) => {
    setStatus((prev) => {
      return {
        ...prev,
        comment: e.target.value,
      };
    });
  };
  const data = {
    order_id: orderId,
    comment: status.comment,
    notify: enabled,
    order_status_id: selectedStatus.ID,
  };

  const handleSubmit = async (e) => {
    setSuccess(false);
    setIsUpdate(true);
    // Prevent the default submit and page reload
    e.preventDefault();

    // Handle validations
    console.log(
      'ORDER HİSTORY EDİTİNDEN GÖNDERİLEN ORDER HİSTORY DATA:: ',
      data
    );
    const response = await editOrderHistory(data, orderId);

    //TODO: Response Status 201 olmalı.
    if (response.status === 201) {
      setSuccess(true);
      window.location.reload();
    }
    setIsUpdate(false);
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
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md resize'>
            <div className=' px-4 bg-white pb-4 pt-5 sm:p-6 sm:pb-4 '>
              <div className='sm:flex sm:items-start '>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left  w-full'>
                  <h3
                    className='text-base font-semibold leading-6 text-gray-600  border-b'
                    id='modal-title'
                  >
                    Sipariş Durumu Değiştir
                  </h3>
                  <div>
                    <form
                      action=''
                      id='login'
                      method='post'
                      onSubmit={handleSubmit}
                      className='w-full mt-4 '
                    >
                      <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-first-name'
                          >
                            Yeni Durum
                          </label>

                          <p className='text-gray-500 text-xl'>
                            {selectedStatus.name}
                          </p>
                        </div>
                      </div>

                      <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3'>
                          <label
                            htmlFor='message'
                            className='block mb-2 text-sm font-medium text-gray-900'
                          >
                            Durum Açıklaması
                          </label>
                          <textarea
                            value={status.comment}
                            rows='4'
                            name='comment'
                            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Meta açıklaması giriniz...'
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
                            Müşteriye Bildir
                          </label>
                          <div className='flex'>
                            <label className='inline-flex relative items-center mr-5 cursor-pointer'>
                              <input
                                type='checkbox'
                                className='sr-only peer'
                                checked={enabled}
                                readOnly
                              />
                              <div
                                onClick={() => {
                                  setEnabled(!enabled);
                                }}
                                className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                              ></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                        <button
                          disabled={success}
                          type='submit'
                          className='inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto'
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
                            window.location.reload(false);
                            closeModal(false);
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

export default OrderHistoryEditModal;
