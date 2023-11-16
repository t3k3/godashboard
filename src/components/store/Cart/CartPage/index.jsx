'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CartItem from './CartItem';
import CartCoupon from './CartCoupon';
import ProductWrapper from '../../Home/ProductWrapper';

function CartPage({ cart, products }) {
  const router = useRouter();

  const removeCart = async (cart_id) => {
    var requestOptions = {
      method: 'DELETE',
    };

    const response = await fetch(
      `/api/cart?cart_id=${cart_id}`,
      requestOptions
    );

    const res = await response.json();

    if (res.error) {
      setWarnings(res.error);
      return;
    }

    // console.log('RES: ', res);

    router.refresh();
  };

  return (
    <>
      <div className='container grid lg:grid-cols-12 gap-6 pb-16'>
        <div className='lg:col-span-8 xl:col-span-9'>
          {/* <h1 className='py-2 px-3 bg-gray-50 rounded flex items-center'>
          <span className='w-3/5'>Ürünler</span>
          <span className='w-3/12'>Adet</span>
          <span className='w-3/5'>Toplam Tutar</span>
        </h1> */}
          {cart.error
            ? 'Sepetiniz Boş'
            : cart?.products?.map((product, index) => {
                return (
                  <CartItem
                    key={index}
                    product={product}
                    index={index}
                    removeCart={removeCart}
                  />
                  // <div
                  //   key={index}
                  //   className='border mb-2 border-gray-200 p-5 rounded flex flex-col md:flex-row gap-5 md:items-center justify-between'
                  // >
                  //   <div className='flex flex-col sm:flex-row gap-5 sm:items-center'>
                  //     <div className='sm:max-w-[150px]'>
                  //       <Image
                  //         src={product?.thumb && product?.thumb}
                  //         alt='urun'
                  //         width={200}
                  //         height={200}
                  //         className='w-full sm:max-h-[150px]'
                  //       />
                  //     </div>
                  //     <div className='max-w-sm'>
                  //       <Link
                  //         href={`/urun/${product.href}`}
                  //         className='text-lg block mb-4 font-medium uppercase text-gray-800 hover:text-primary transition'
                  //       >
                  //         {product.name}
                  //       </Link>

                  //       <p className='text-base font-medium text-primary'>
                  //         {product.price}
                  //       </p>
                  //       {product?.option &&
                  //         product?.option.map((opt) => {
                  //           return (
                  //             <div key={opt.name} className='flex space-x-2 '>
                  //               <p className='text-base '>{opt.name}:</p>
                  //               <p
                  //                 key={opt}
                  //                 className='text-base font-bold text-gray-900'
                  //               >
                  //                 {opt.value}
                  //               </p>
                  //             </div>
                  //           );
                  //         })}
                  //     </div>
                  //   </div>

                  //   <div className='flex items-center justify-between'>
                  //     <div className='mt-4'>
                  //       <div className='flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max'>
                  //         <div className='h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none'>
                  //           -
                  //         </div>
                  //         <div className='h-8 w-8 text-base flex items-center justify-center'>
                  //           <input
                  //             type='number'
                  //             className='h-8 w-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  //             value={product.quantity}
                  //           />
                  //         </div>
                  //         <div className='h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none'>
                  //           +
                  //         </div>
                  //       </div>
                  //     </div>
                  //     <div className='mx-auto'>
                  //       <p className='text-primary px-4 md:px-10'>
                  //         {product.total}
                  //       </p>
                  //     </div>
                  //     <button
                  //       className='px-5 py-3 hover:text-primary transition'
                  //       onClick={() => {
                  //         removeCart(product.cart_id);
                  //       }}
                  //     >
                  //       {/* <TrashIcon className='w-8 h-8' /> */}
                  //       Kaldır
                  //     </button>
                  //   </div>
                  // </div>
                );
              })}
        </div>
        <div className='lg:col-span-4 xl:col-span-3'>
          <div className='border border-gray-200 p-5 rounded'>
            <h3 className='text-lg mb-4 text-gray-800 font-semibold uppercase'>
              Sepet Özeti
            </h3>
            <div className='space-y-3'>
              {cart?.totals?.map((total) => {
                return (
                  <div
                    key={total.title}
                    className='flex items-center justify-between'
                  >
                    <p className='font-medium'>{total.title}</p>

                    <p className='font-medium'>{total.text}</p>
                  </div>
                );
              })}
              <CartCoupon />
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
