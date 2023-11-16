'use client';
import Breadcrums from '@/components/store/Breadcrums';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  confirm,
  getCheckoutFromClientSide,
  saveShippingAndFatura,
} from '@/services/store/checkout';
import PaymentMethods from './PaymentMethods';
import { savePaymentMethod } from '@/services/store/payment';

function PaymentPage(props) {
  const [cart, setCart] = useState(props.cart);

  console.log('CART11232: ', cart);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCart((prevCart) => ({ ...prevCart, [name]: value }));
  };

  const handleChangePaymentMethod = (payment_method) => {
    // const { name, value } = e.target;
    // setCart((prevCart) => ({ ...prevCart, payment_method: payment_method }));
    let cartTemp = { ...cart };
    cartTemp.payment_method = payment_method;

    setCart(cartTemp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cartTemp = { ...cart };

    const response = await savePaymentMethod(cartTemp);

    // console.log('Checkouttan gönderilen data: ', cart);
    //TODO: Response Status 201 olmalı.
    if (response.status === 200) {
      console.log('SUCCESS: ', response.status);
      // const newCheckoutData = await getCheckoutFromClientSide();
      // console.log('newCheckoutData: ', newCheckoutData);
      // setCart(newCheckoutData);
      const confirmResponse = await confirm(cartTemp);
      console.log('confirmResponse: ', confirmResponse);

      // router.push('/payment?account=0');

      // console.log('newCheckoutData: ', newCheckoutData);
    } else {
      console.log('FAİL: ', response.status);
    }
  };

  return (
    <>
      <Breadcrums />
      <div className='container grid  lg:grid-cols-10 gap-10 pb-16 bg-gray-50'>
        <div className='lg:col-span-6'>
          <form id='payment' className='space-y-5'>
            <PaymentMethods
              payment_methods={props.payment_methods}
              payment_method={cart.payment_method}
              handleChangePaymentMethod={handleChangePaymentMethod}
            />
          </form>
        </div>

        <div className='lg:col-span-4 bg-gray-100'>
          <h2 className='border mb-2 font-roboto text-red-600 text-center text-xl'>
            Sepet Özeti
          </h2>

          {cart?.products?.map((product, index) => {
            return (
              <div
                key={index}
                className=' border my-2 border-gray-200 p-5 rounded flex flex-col md:flex-row gap-5 md:items-center justify-between'
              >
                <div className='flex flex-col sm:flex-row gap-5 sm:items-center'>
                  <div className='sm:max-w-[150px]'>
                    <Image
                      className='w-24 h-24 rounded-full object-cover'
                      src={
                        product?.thumb ||
                        'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
                      }
                      alt={product.name}
                      width={96}
                      height={96}
                    />
                  </div>
                  <div className='max-w-sm'>
                    <Link href={`/urun${product.href}`}>
                      <p className='text-lg block mb-2 font-medium uppercase text-gray-800 hover:text-primary transition'>
                        {product.name}
                      </p>
                    </Link>
                    {product?.option &&
                      product?.option.map((opt) => {
                        return (
                          <div key={opt.name} className='flex space-x-2 '>
                            <p className='text-base '>{opt.name}:</p>
                            <p
                              key={opt}
                              className='text-base font-bold text-gray-900'
                            >
                              {opt.value}
                            </p>
                          </div>
                        );
                      })}
                    <p className='text-base font-medium text-primary'>
                      {product.total}
                    </p>
                    <p className='text-base'>Adet: {product.quantity}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className='lg:col-span-4 xl:col-span-3'>
            <div className='border border-gray-200 p-5 rounded'>
              <h3 className='text-lg mb-4 text-gray-800 font-semibold uppercase'>
                Sepet Özeti
              </h3>
              <div className='space-y-3'>
                {cart?.totals?.map((total, index) => {
                  return (
                    <div
                      key={index}
                      className='flex items-center justify-between'
                    >
                      <p className='font-medium'>{total.title}</p>
                      <p className='font-medium'>{total.text}</p>
                    </div>
                  );
                })}
              </div>
              {cart?.totals?.map((total, index, arr) => {
                if (arr.length - 1 === index) {
                  return (
                    <h2
                      key={index}
                      className='mt-4 pt-4 text-2xl font-semibold border-t border-gray-200 flex items-center justify-between'
                    >
                      <span>{total.title}</span>
                      <span>{total.text}</span>
                    </h2>
                  );
                }
              })}

              <button
                className={`${
                  cart.payment_method == '' && 'disabled:opacity-75'
                } focus:outline-none mt-8 uppercase font-medium rounded border border-primary w-full py-2 flex items-center justify-center space-x-2 bg-primary text-white hover:text-primary hover:bg-transparent transition`}
                disabled={cart.payment_method == ''}
                onClick={handleSubmit}
              >
                SİPARİŞİ TAMAMLA
              </button>
              {cart.payment_method == '' && (
                <span className='text-sm text-red-400'>
                  Ödeme yöntemi seçmediniz.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
