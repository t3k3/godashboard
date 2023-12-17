'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CartItem from './CartItem';
import CartCoupon from './CartCoupon';
import ProductWrapper from '../../Home/ProductWrapper';
import { deleteCart } from '@/services/store/cart';

function CartPage({ cart, products }) {
  const router = useRouter();

  const removeCart = async (cart_item_id) => {
    const response = await deleteCart(cart_item_id);

    console.log('response12321321322342443: ', response.status);

    // if (res.error) {
    //   setWarnings(res.error);
    //   return;
    // }

    if (response.status === 200) {
      router.refresh();
    }

    // console.log('RES: ', res);
  };

  console.log('cart 43543534534: ', cart);

  return (
    <>
      <div className='container grid lg:grid-cols-12 gap-6 pb-16'>
        <div className='lg:col-span-8 xl:col-span-9'>
          {/* <h1 className='py-2 px-3 bg-gray-50 rounded flex items-center'>
          <span className='w-3/5'>Ürünler</span>
          <span className='w-3/12'>Adet</span>
          <span className='w-3/5'>Toplam Tutar</span>
        </h1> */}
          {cart.cart_items.length === 0
            ? 'Sepetiniz Boş'
            : cart?.cart_items?.map((product) => {
                return (
                  <CartItem
                    key={product.ID}
                    product={product}
                    removeCart={removeCart}
                  />
                );
              })}
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
                <p className='font-medium'>Toplam: </p>
                <p className='font-medium'>{cart.totals.total.toFixed(2)} TL</p>
              </div>

              <CartCoupon />
            </div>

            <h2 className='mt-4 pt-4 text-2xl font-semibold border-t border-gray-200 flex items-center justify-between'>
              <span>Toplam:</span>
              <span>{cart.totals.total.toFixed(2)} TL</span>
            </h2>

            <Link href={'/checkout'}>
              <button
                disabled={cart.error}
                className={`${
                  cart.error && 'disabled:opacity-75'
                } focus:outline-none mt-8 uppercase font-medium rounded border border-primary w-full py-2 flex items-center justify-center space-x-2 bg-primary text-white hover:text-primary hover:bg-transparent transition`}
              >
                ALIŞVERİŞİ TAMAMLA
              </button>
              {cart.error && (
                <span className='text-sm text-red-400'>
                  Devam edebilmek için sepete ürün eklemelisiniz.
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      <ProductWrapper wrapperName={'Birlikte Alinanlar'} products={products} />
    </>
  );
}

export default CartPage;
