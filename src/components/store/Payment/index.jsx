'use client';
import Breadcrums from '@/components/store/Breadcrums';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import {
  confirm,
  getCheckoutFromClientSide,
  saveShippingAndFatura,
} from '@/services/store/checkout';
import PaymentMethods from './PaymentMethods';
import {
  paramSendOrderData,
  paramTest,
  savePaymentMethod,
} from '@/services/store/payment';
import PaymentProducts from './PaymentProducts';
import PaymentOkButtonDesktop from './PaymentOkButtonDesktop';
import PaymentOkButtonMobile from './PaymentOkButtonMobile';

import { confirmOrderEft } from '@/services/store/payment';
import PaymentResponseHTML from './PaymentResponseHTML';

import { useSearchParams } from 'next/navigation';

const kk_data = {
  guid: '',
  orderID: '',
  card_holder: '',
  card_number: '',
  card_valid_thru: '',
  card_ay: '',
  card_yil: '',
  card_ccv: '',
  installment: '1',
  gsm: '',
  type: '3D',
  total: 0,
  feeTotal: 0,
  hash: '',
  ip: '',
  hataURL: 'https://www.example.com/hata',
  basariliURL: 'https://www.example.com/basarili',
};

function PaymentPage(props) {
  // const searchParams = params.get('hello');
  // if (searchParams) {
  //   console.log('HELLOOOOOO ');
  // }

  const [payment, setPayment] = useState(props.payment);

  const [warning, setWarning] = useState(false);

  const [paymentError, setPaymentError] = useState(false);

  useState(() => {
    if (payment.order.result) {
      setPaymentError(JSON.parse(payment.order.result));
    }
  }, [payment]);

  const [kkData, setKkData] = useState(kk_data);

  const [totals, setTotals] = useState(JSON.parse(payment.order.totals));
  const [paymentModal, setPaymentModal] = useState(false);

  const [soapResponse, setSoapResponse] = useState('');

  // let totals = {
  //   sub_total: 4166.666666666667,
  //   coupon: 0,
  //   shipping: 60,
  //   vat: 833.333333333333,
  //   vat_rate: 20,
  //   total: 5060,
  // };

  // console.log('PAYMENT DATA 11231231: ', payment);
  // console.log('TOTALS 11231231: ', totals);
  // console.log('kkData from Payment page: ', kkData);

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

  const creditCardPayment = async () => {
    console.log('kkData: ', kkData);

    let kkDataTemp = { ...kkData };
    kkDataTemp.total = JSON.parse(payment.order.totals)
      .total.toFixed(2)
      .toString()
      .replace('.', ',');
    kkDataTemp.card_ay = kkData.card_valid_thru.toString().split('/')[0];
    kkDataTemp.card_yil = kkData.card_valid_thru.toString().split('/')[1];

    kkDataTemp.feeTotal = Number.parseFloat(totals.total)
      .toFixed(2)
      .replace('.', ',');

    kkDataTemp.gsm = payment.order.phone;
    kkDataTemp.orderID = payment.order.ID;
    console.log('kkDataTemp: ', kkDataTemp);
    const response = await paramSendOrderData(kkDataTemp);
    console.log('response 3D Model send kkdatatemp: ', response);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response, 'text/xml');

    // UCD_HTML elementini bulun ve içeriğini alın.
    const htmlContent = xmlDoc.getElementsByTagName('UCD_HTML')[0].textContent;
    console.log('htmlContent 33355: ', htmlContent);

    setSoapResponse(htmlContent);

    setPaymentModal(true);
  };

  const eftPayment = async () => {
    var response = null;
    response = await confirmOrderEft(
      props.cookies,
      payment.order.ID,
      payment.order.payment_method,
      payment.order.payment_code
    );

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // var response = null;
    // 0: Kredi Kartı 1: Havale/EFT, 2: Kapıda Ödeme,
    if (payment.order.payment_method == 1) {
      if (payment.order.payment_code == 0) {
        setWarning(true);
        return;
      } else {
        eftPayment();
      }
    }

    if (payment.order.payment_method == 0) {
      creditCardPayment();
    }
  };

  // console.log('payment  456554656: ', payment);

  // if (paymentModal)
  //   return (
  //     <div>
  //       <PaymentResponseHTML soapResponse={soapResponse} />
  //     </div>
  //   );

  return (
    <>
      {/* PRODUCT OPTION EDIT MODAL */}
      {paymentModal ? (
        <PaymentResponseHTML soapResponse={soapResponse} />
      ) : null}
      <Breadcrums />
      <div className='container grid  lg:grid-cols-10 gap-10 pb-16 shadow-lg'>
        <div className='lg:col-span-6 space-y-8'>
          <form id='payment' className='space-y-5'>
            <div className='w-full  space-y-2 '>
              <PaymentMethods
                // payment_methods={props.payment_methods}
                payment={payment}
                totals={totals}
                setTotals={setTotals}
                paymentError={paymentError}
                realTotals={payment.order.totals}
                payment_method={payment.payment_method}
                handleChangePaymentMethod={handleChangePaymentMethod}
                handleChangePaymentEFTMethod={handleChangePaymentEFTMethod}
                kkData={kkData}
                setKkData={setKkData}
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
