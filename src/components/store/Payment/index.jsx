'use client';
import Breadcrums from '@/components/store/Breadcrums';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  confirm,
  getCheckoutFromClientSide,
  saveShippingAndFatura,
} from '@/services/store/checkout';
import PaymentMethods from './PaymentMethods';
import { savePaymentMethod } from '@/services/store/payment';
import PaymentProducts from './PaymentProducts';
import PaymentOkButtonDesktop from './PaymentOkButtonDesktop';
import PaymentOkButtonMobile from './PaymentOkButtonMobile';

import { confirmOrderEft } from '@/services/store/payment';

function PaymentPage(props) {
  const [payment, setPayment] = useState(props.payment);
  const [warning, setWarning] = useState(false);

  const totals = JSON.parse(payment.order.totals);

  const router = useRouter();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setpayment((prevpayment) => ({ ...prevpayment, [name]: value }));
  // };

  const handleChangePaymentMethod = (payment_method) => {
    // const { name, value } = e.target;
    // setPayment((prevpayment) => ({ ...prevpayment, payment_method: payment_method }));
    let paymentTemp = { ...payment };
    paymentTemp.order.payment_method = payment_method;

    setPayment(paymentTemp);
  };

  const handleChangePaymentEFTMethod = (payment_method) => {
    // const { name, value } = e.target;
    // setPayment((prevpayment) => ({ ...prevpayment, payment_method: payment_method }));
    let paymentTemp = { ...payment };
    paymentTemp.order.payment_code = payment_method;

    setPayment(paymentTemp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var response = null;
    // 0: Kredi Kartı 1: Havale/EFT, 2: Kapıda Ödeme,
    if (payment.order.payment_method == 1) {
      if (payment.order.payment_code == 0) {
        setWarning(true);
        return;
      } else {
        response = await confirmOrderEft(
          props.cookies,
          payment.order.ID,
          payment.order.payment_method,
          payment.order.payment_code
        );
      }
    }

    console.log('response.status: ', response.status);

    // console.log('Checkouttan gönderilen data: ', payment);
    //TODO: Response Status 201 olmalı.
    if (response.status === 200) {
      console.log('SUCCESS: ', response);
      router.push('/confirm?orderid=' + response.data);
      router.refresh();

      // console.log('newCheckoutData: ', newCheckoutData);
    } else {
      console.log('FAİL: ', response.status);
    }
  };

  // console.log('payment  456554656: ', payment);
  return (
    <>
      <Breadcrums />
      <div className='container grid  lg:grid-cols-10 gap-10 pb-16 shadow-lg'>
        <div className='lg:col-span-6 space-y-8'>
          <form id='payment' className='space-y-5'>
            <div className='w-full  space-y-2 '>
              <PaymentMethods
                // payment_methods={props.payment_methods}
                payment_method={payment.payment_method}
                handleChangePaymentMethod={handleChangePaymentMethod}
                handleChangePaymentEFTMethod={handleChangePaymentEFTMethod}
              />
            </div>
          </form>
          <div className='lg:col-span-4 '>
            <PaymentProducts products={payment.order.order_products} />
          </div>
        </div>
        <PaymentOkButtonDesktop
          payment={payment}
          totals={totals}
          warning={warning}
          handleSubmit={handleSubmit}
        />
      </div>
      <PaymentOkButtonMobile
        payment={payment}
        totals={totals}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default PaymentPage;
