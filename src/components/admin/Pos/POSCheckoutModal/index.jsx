'use client';
import React, { useEffect, useState } from 'react';

function POSCheckoutModal(props) {
  const totalPrice = props.cart.reduce(
    (total, product) => total + product.price * product.sold,
    0
  );
  const [incomePrice, setIncomePrice] = useState('');
  const [incomePriceEnd, setIncomePriceEnd] = useState('');
  const [paymentType, setPaymentType] = useState('');
  // Option state'i
  // const [optionName, setOptionName] = useState('');
  // const [optionType, setOptionType] = useState('select');
  // const [optionValues, setOptionValues] = useState([{ name: '' }]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleIncomePriceEndChange = (e) => {
    let value = e.target.value;

    // Sadece sayısal değerleri kabul et
    value = value.replace(/[^0-9]/g, '');

    // Eğer uzunluk 1'den büyükse, sadece ilk iki karakteri al
    if (value.length > 2) {
      value = value.substring(0, 2);
    }

    // Eğer değer tek haneli ise, sonuna '0' ekle
    value = value.padEnd(2, '0');

    setIncomePriceEnd(value);
  };

  console.log('totalPrice: ', totalPrice);
  useEffect(() => {
    let totalString = totalPrice.toString();
    let totalStringArray = totalString.split('.');
    setIncomePrice(totalStringArray[0]);
    setIncomePriceEnd(totalStringArray[1]);
  }, [totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentType === '') {
      alert('Lütfen ödeme tipini seçiniz');
      return;
    }

    setSuccess(false);
    setIsUpdate(true);
    // Prevent the default submit and page reload
    e.preventDefault();

    console.log('hello');
    console.log('paymentType: ', paymentType);

    // // API'ye gönderilecek payload
    // const payload = {
    //   name: optionName,
    //   type: optionType,
    //   values: optionValues,
    // };

    // console.log('OPTION EKLE GÖNDERİLEN DATA: ', payload);

    // const response = await CreateOptionWithValues(payload);

    // console.log('RESPONSE123: ', response);
    // if (response.status === 201) {
    //   setSuccess(true);
    //   props.setOptions(response.data);
    //   props.closeModal(false);
    // }

    setIsUpdate(false);
  };
  console.log(props.cart);
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
                    ÖDEME
                  </h3>

                  <div className='relative overflow-x-auto mt-4'>
                    <table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
                      <thead className='text-xs text-gray-700 uppercase bg-gray-100 '>
                        <tr>
                          <th scope='col' className='px-6 py-3'>
                            Ürün Adı
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Adet
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Birim Fiyat
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Toplam Fiyat
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.cart.map((item) => (
                          <tr
                            key={item.barcode}
                            className='bg-white border-b hover:bg-gray-50'
                          >
                            <th
                              scope='row'
                              className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '
                            >
                              {item.name}
                            </th>
                            <td className='px-6 py-4'>{item.sold}</td>
                            <td className='px-6 py-4'>
                              ₺
                              {item.price.toLocaleString('tr-TR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </td>
                            <td className='px-6 py-4'>
                              ₺
                              {(item.price * item.sold).toLocaleString(
                                'tr-TR',
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr className='bg-white border-b hover:bg-gray-50'>
                          <th
                            scope='row'
                            className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '
                          ></th>
                          <td className='px-6 py-4'></td>
                          <td className='px-6 py-4 text-md font-bold '>
                            TOPLAM
                          </td>
                          <td className='px-6 py-4 text-lg font-bold text-primary'>
                            ₺
                            {totalPrice.toLocaleString('tr-TR', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <form
                      action=''
                      onSubmit={handleSubmit}
                      className='w-full mt-4 '
                    >
                      <div className='flex flex-wrap -mx-3 mb-6'>
                        <ul className='grid w-full gap-6 md:grid-cols-2'>
                          <li>
                            <input
                              type='radio'
                              id='cash'
                              name='payment-type'
                              value='cash'
                              className='hidden peer'
                              onChange={() => {
                                setPaymentType('cash');
                              }}
                            />
                            <label
                              htmlFor='cash'
                              className='inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100'
                            >
                              <div className='block'>
                                <div className='w-full text-lg font-semibold'>
                                  NAKİT
                                </div>
                              </div>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-12 h-12'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z'
                                />
                              </svg>
                            </label>
                          </li>
                          <li>
                            <input
                              type='radio'
                              id='credit-card'
                              name='payment-type'
                              value='credit-card'
                              className='hidden peer'
                              onChange={() => {
                                setPaymentType('credit-card');
                              }}
                            />
                            <label
                              htmlFor='credit-card'
                              className='inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100'
                            >
                              <div className='block'>
                                <div className='w-full text-lg font-semibold'>
                                  KREDİ KARTI
                                </div>
                              </div>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-12 h-12'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z'
                                />
                              </svg>
                            </label>
                          </li>
                        </ul>
                      </div>
                      <div className='w-full  px-3 my-12 md:mb-0'>
                        <label
                          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-first-name'
                        >
                          Tahsil edilen tutar
                        </label>
                        <input
                          className='appearance-none block w-full bg-gray-50 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500'
                          name='income_price'
                          type='number'
                          value={incomePrice}
                          placeholder='Tahsil edilen tutar'
                          onChange={(e) => {
                            setIncomePrice(e.target.value);
                          }}
                        />
                      </div>
                      <div className='flex items-center space-x-2'>
                        <input
                          type='text'
                          className='block w-24 text-right border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                          placeholder='000'
                          value={incomePrice}
                          onChange={(e) => {
                            setIncomePrice(e.target.value);
                          }}
                        />
                        <span>,</span>
                        <input
                          type='text'
                          className='block w-12 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                          placeholder='00'
                          value={incomePriceEnd}
                          onChange={handleIncomePriceEndChange}
                        />
                      </div>

                      <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                        <button
                          type='submit'
                          disabled={isUpdate}
                          // disabled={isUpdate || paymentType === ''}
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
                            props.setPosCheckoutModal(false);
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

export default POSCheckoutModal;
