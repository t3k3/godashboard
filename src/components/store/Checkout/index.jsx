'use client';
import Breadcrums from '@/components/store/Breadcrums';
import SelectShipping from '@/components/store/Checkout/SelectShipping';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import cities from '/public/cities.json';

import CartCoupon from '../Cart/CartPage/CartCoupon';

import {
  createOrder,
  getCheckout,
  getCheckoutFromClientSide,
  saveShippingAndFatura,
  saveShippingMethod,
} from '@/services/store/checkout';

import GuestAddresses from './GuestAddresses';
import ClientAddresses from './ClientAddresses';
import { getCart } from '@/services/store/cart';

const ilceler = [
  {
    name: 'Akyurt',
  },
  {
    name: 'Altındağ',
  },
  {
    name: 'Ayaş',
  },
  {
    name: 'Bala',
  },
  {
    name: 'Beypazarı',
  },
  {
    name: 'Çamlıdere',
  },
  {
    name: 'Çankaya',
  },
  {
    name: 'Çubuk',
  },
  {
    name: 'Elmadağ',
  },
  {
    name: 'Etimesgut',
  },
  {
    name: 'Evren',
  },
  {
    name: 'Gölbaşı',
  },
  {
    name: 'Güdül',
  },
  {
    name: 'Haymana',
  },
  {
    name: 'Kahramankazan',
  },
  {
    name: 'Kalecik',
  },
  {
    name: 'Keçiören',
  },
  {
    name: 'Kızılcahamam',
  },
  {
    name: 'Mamak',
  },
  {
    name: 'Nallıhan',
  },
  {
    name: 'Polatlı',
  },
  {
    name: 'Pursaklar',
  },
  {
    name: 'Şereflikoçhisar',
  },
  {
    name: 'Sincan',
  },
  {
    name: 'Yenimahalle',
  },
];

const orderJSON = {
  customer_id: 0,
  firstname: '',
  lastname: '',
  tckn: '12345678901',
  email: 'test@123.com',
  phone: '1234567890',
  order_status_id: 0,
  totals: '',
  payment_method: 0,
  payment_code: 0,
  shipping_method: 'free_shipping',
  shipping_code: 0,
  coupon: '',
  comment: '',
  shipping_country: 'Austria',
  shipping_city: 'Caldwellfurt',
  shipping_ilce: 'burgh',
  shipping_postcode: '12345',
  shipping_mahalle: 'Jerry Viaduct',
  shipping_address: '79138 Hernandez Mountain Suite 627',
  payment_country: 'Vanuatu',
  payment_city: 'Lake Michaelfort',
  payment_ilce: 'ville',
  payment_mahalle: 'Garrison Station',
  payment_address: '13748 Jose Vista',
  vkn: '2713682997',
  vd: 'Port Carrietown',
  company: 'Patterson-Hawkins',
};

function CheckoutPage(props) {
  const router = useRouter();

  // console.log('props.cart.error: ', !!props.cart.error);
  // if (!!props.cart.error) {
  //   router.push('/sepet');
  // }

  const [cart, setCart] = useState(props.cart);
  const [order, setOrder] = useState(orderJSON);
  const [couponCode, setCouponCode] = useState('');
  // console.log('order45654646 : ', order);

  // const [formData, setFormData] = useState(props.cart);
  const [sameAddresses, setSameAddresses] = useState(1);

  // console.log('formData: ', formData);

  const haldeShippingSelect = async (selected) => {
    console.log('haldeShippingSelect', selected);

    // let cartTemp = { ...cart };
    // cartTemp.shipping_method = selected.code;

    // console.log('cartTemp: ', cartTemp);

    const response = await getCheckout(props.cookies, selected.ID, couponCode);
    // console.log('response21321312: ', response);

    setCart(response.checkout.cart);
    setOrder((prevCart) => ({
      ...prevCart,
      shipping_method: selected.name,
      shipping_code: selected.ID,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevCart) => ({ ...prevCart, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('order: ', order);

    const response = await createOrder(order);
    // setCart(cartTemp);
    // router.refresh();

    console.log('response4242424234: ', response);

    if (response.status === 201) {
      console.log('SUCCESS: ', response.status);
      console.log('response.data: ', response.data);

      router.push('/payment?account=0&orderid=' + response.data);

      // console.log('newCheckoutData: ', newCheckoutData);
    } else {
      console.log('FAİL: ', response.status);
    }
  };

  // http://demo.actsistem.com/api/v1/store/index.php?route=account/address
  // liste
  // demo.actsistem.com/api/v1/store/index.php?route=account/address/add
  // yeni adres ekleme
  // demo.actsistem.com/api/v1/store/index.php?route=account/address/edit
  // mevcut adresi düzenleme

  // console.log('CART: ', cart);
  return (
    <>
      <Breadcrums />

      <div className='container grid  lg:grid-cols-10 gap-10 pb-16 bg-white'>
        {/* ADRESLER */}
        <div className='lg:col-span-5'>
          {/* sepet boş */}
          {cart.cart_items.length < 1 && router.push('/sepet')}

          {props.isLogged == 0 ? (
            <GuestAddresses
              order={order}
              handleChange={handleChange}
              sameAddresses={sameAddresses}
              setSameAddresses={setSameAddresses}
              cities={cities}
              ilceler={ilceler}
            />
          ) : (
            <ClientAddresses setOrder={setOrder} />
          )}
        </div>

        <div className='lg:col-span-5 bg-gray-100'>
          <h2 className='border mb-2 font-roboto text-red-600 text-center text-xl'>
            Sepet Özeti
          </h2>

          {cart?.cart_items?.map((product, index) => {
            return (
              <div
                key={index}
                className=' border my-2 border-gray-200 p-5 rounded flex flex-col md:flex-row gap-5 md:items-center justify-between'
              >
                <div className='flex flex-col sm:flex-row gap-5 sm:items-center'>
                  <div className='sm:max-w-[150px]'>
                    <Image
                      className='w-24 h-24 rounded-sm '
                      src={
                        `/${product?.thumb}` ||
                        'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
                      }
                      alt={product.name}
                      width={96}
                      height={96}
                    />
                  </div>
                  <div className='max-w-sm'>
                    <p className='text-lg block mb-2 font-medium uppercase text-gray-800'>
                      {product.name}
                    </p>

                    {JSON.parse(product.option).map((opt) => {
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
                      {product.price * product.quantity} TL
                    </p>
                    <p className='text-base'>Adet: {product.quantity}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className='bg-gray-100 mt-8'>
            <h2 className='border mb-2 font-roboto text-red-600 text-center text-xl'>
              Kargo Seçimi
            </h2>
            {cart && (
              <SelectShipping
                shipping_options={props.shipping_options}
                haldeShippingSelect={haldeShippingSelect}
              />
            )}
          </div>
          <div className='lg:col-span-4 xl:col-span-3'>
            <div className='border border-gray-200 p-5 rounded'>
              <h3 className='text-lg mb-4 text-gray-800 font-semibold uppercase'>
                Sepet Özeti
              </h3>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <p className='font-medium'>Ara Toplam:</p>
                  <p className='font-medium'>
                    {cart.totals.sub_total.toFixed(2)} TL
                  </p>
                </div>
                <div className='flex items-center justify-between'>
                  <p className='font-medium'>KDV (%{cart.totals.vat_rate}) </p>
                  <p className='font-medium'>{cart.totals.vat.toFixed(2)} TL</p>
                </div>
                <div className='flex items-center justify-between'>
                  <p className='font-medium'>Kargo Ücreti</p>
                  <p className='font-medium'>
                    {cart.totals.shipping.toFixed(2)} TL
                  </p>
                </div>

                {/* <div className='flex items-center justify-between'>
                  <p className='font-medium'>Toplam: </p>
                  <p className='font-medium'>
                    {cart.totals.total.toFixed(2)} TL
                  </p>
                </div> */}

                <CartCoupon />
              </div>

              <h2 className='mt-4 pt-4 text-2xl font-semibold border-t border-gray-200 flex items-center justify-between'>
                <span>Toplam:</span>
                <span>{cart.totals.total.toFixed(2)} TL</span>
              </h2>

              <button
                disabled={cart.error}
                className={`${
                  cart.error && 'disabled:opacity-75'
                } focus:outline-none mt-8 uppercase font-medium rounded border border-primary w-full py-2 flex items-center justify-center space-x-2 bg-primary text-white hover:text-primary hover:bg-transparent transition`}
                onClick={handleSubmit}
              >
                ALIŞVERİŞİ TAMAMLA
              </button>
              {cart.error && (
                <span className='text-sm text-red-400'>
                  Devam edebilmek için sepete ürün eklemelisiniz.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
