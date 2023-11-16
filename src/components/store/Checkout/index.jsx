'use client';
import Breadcrums from '@/components/store/Breadcrums';
import SelectShipping from '@/components/store/Checkout/SelectShipping';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import cities from '/public/cities.json';

import {
  getCheckoutFromClientSide,
  saveShippingAndFatura,
  saveShippingMethod,
} from '@/services/store/checkout';
import GuestAddresses from './GuestAddresses';
import ClientAddresses from './ClientAddresses';

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

function CheckoutPage(props) {
  const router = useRouter();

  // console.log('props.cart.error: ', !!props.cart.error);
  // if (!!props.cart.error) {
  //   router.push('/sepet');
  // }

  const [cart, setCart] = useState(props.cart);

  // const [formData, setFormData] = useState(props.cart);
  const [sameAddresses, setSameAddresses] = useState(1);

  // console.log('formData: ', formData);

  const haldeShippingSelect = async (selected) => {
    console.log('haldeShippingSelect', selected);

    let cartTemp = { ...cart };
    cartTemp.shipping_method = selected.code;

    console.log('cartTemp: ', cartTemp);

    const response = await saveShippingMethod(cartTemp);

    const newCheckoutData = await getCheckoutFromClientSide();
    console.log('newCheckoutData: ', newCheckoutData);
    setCart(newCheckoutData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCart((prevCart) => ({ ...prevCart, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let cartTemp = { ...cart };
    cartTemp.sameAddresses = sameAddresses;

    const response = await saveShippingAndFatura(cartTemp);
    setCart(cartTemp);
    router.refresh();

    if (response.status === 200) {
      console.log('SUCCESS: ', response.status);

      router.push('/payment?account=0');

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
          {/* {!cart && router.push('/sepet')} */}

          {cart.addresses.length < 1 && !props.isLogged ? (
            <GuestAddresses
              cart={cart}
              handleChange={handleChange}
              sameAddresses={sameAddresses}
              setSameAddresses={setSameAddresses}
              cities={cities}
              ilceler={ilceler}
            />
          ) : (
            <ClientAddresses addresses={cart.addresses} />
          )}
        </div>

        <div className='lg:col-span-5 bg-gray-100'>
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

          <div className='bg-gray-100 mt-8'>
            <h2 className='border mb-2 font-roboto text-red-600 text-center text-xl'>
              Kargo Seçimi
            </h2>
            {cart && (
              <SelectShipping
                shipping_methods={props.cart.shipping_methods}
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

              {/* <CartCoupon /> */}
              {/* <Link href={'/payment?account=0'}> */}
              <span
                className='focus:outline-none mt-8 uppercase font-medium rounded border border-primary w-full py-2 flex items-center justify-center space-x-2 bg-primary text-white hover:text-primary hover:bg-transparent transition cursor-pointer'
                onClick={handleSubmit}
              >
                ÖDEME İŞLEMLERİ
              </span>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
