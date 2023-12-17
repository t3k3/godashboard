'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function CartItem({ product, removeCart }) {
  const [itemCount, setItemCount] = useState(product.quantity);

  let optionsObject = {};
  if (product?.option_id > 0) {
    optionsObject = JSON.parse(product.option);
  }

  const router = useRouter();

  const decreaseItemCount = () => {
    const newItemCount = itemCount;
    handleChangeDecreaseItemCount(Number(newItemCount) - 1);
  };

  const handleChangeDecreaseItemCount = (newItemCount) => {
    if (newItemCount < 1) {
      return;
    }

    setItemCount(newItemCount);

    const changeCartItemQuantity = async () => {
      var requestOptions = {
        method: 'PATCH',
        body: JSON.stringify({
          cart_item_id: product.ID,
          quantity: newItemCount,
        }),
      };

      const response = await fetch(`/api/cart`, requestOptions);

      const res = await response.json();

      router.refresh();
    };
    if (newItemCount != '' && newItemCount > 0) {
      changeCartItemQuantity();
    }
  };

  const increaseItemCount = () => {
    const newItemCount = itemCount;
    handleChangeIncreaseItemCount(Number(newItemCount) + 1);
  };

  const handleChangeIncreaseItemCount = (newItemCount) => {
    if (newItemCount < 1) {
      return;
    }

    setItemCount(newItemCount);

    const changeCartItemQuantity = async () => {
      var requestOptions = {
        method: 'PATCH',
        body: JSON.stringify({
          cart_item_id: product.ID,
          quantity: newItemCount,
        }),
      };

      const response = await fetch(`/api/cart`, requestOptions);

      const res = await response.json();

      router.refresh();
    };
    if (newItemCount != '' && newItemCount > 0) {
      changeCartItemQuantity();
    }
  };

  const handleChange = (e) => {
    // if (e.target.value < 1) {
    //   return;
    // }

    setItemCount(e.target.value);

    const changeCartItemQuantity = async () => {
      var requestOptions = {
        method: 'PATCH',
        body: JSON.stringify({
          cart_item_id: product.ID,
          quantity: Number(e.target.value),
        }),
      };

      const response = await fetch(`/api/cart`, requestOptions);

      const res = await response.json();

      router.refresh();
    };
    if (e.target.value != '' && e.target.value > 0) {
      changeCartItemQuantity();
    }
  };
  return (
    <div className='border mb-2 border-gray-200 p-5 rounded flex flex-col md:flex-row gap-5 md:items-center justify-between'>
      <div className='flex flex-col sm:flex-row gap-5 sm:items-center'>
        <div className='sm:max-w-[150px]'>
          <Image
            src={product?.thumb && product?.thumb}
            alt='urun'
            width={200}
            height={200}
            className='w-full sm:max-h-[150px]'
          />
        </div>
        <div className='max-w-sm'>
          <Link
            href={`/urun/${product.href}`}
            className='text-lg block mb-4 font-medium uppercase text-gray-800 hover:text-primary transition'
          >
            {product.name}
          </Link>

          <p className='text-base font-medium text-primary'>
            {product.price.toFixed(2)} TL
          </p>
          {product?.option_id > 0 &&
            optionsObject.map((opt) => {
              return (
                <div key={opt.name} className='flex space-x-2 '>
                  <p className='text-base '>{opt.name}:</p>
                  <p key={opt} className='text-base font-bold text-gray-900'>
                    {opt.value}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
      <form action=''>
        <div className='flex items-center justify-between'>
          <div className='mt-4'>
            <div className='flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max'>
              <div
                className='h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none border'
                onClick={() => decreaseItemCount()}
              >
                -
              </div>
              <div className='h-8 w-12 text-base flex items-center justify-center border'>
                <input
                  type='number'
                  name='quantity'
                  min={1}
                  className='h-8 w-12 p-2 border-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  value={itemCount}
                  onChange={(e, itemCount) => handleChange(e, itemCount)}
                />
              </div>
              <div
                className='h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none border'
                onClick={() => increaseItemCount()}
              >
                +
              </div>
            </div>
          </div>
          <div className='mx-auto'>
            <p className='text-primary px-4 md:px-10'>
              {(product.price * product.quantity).toFixed(2)} TL
            </p>
          </div>

          <span
            className='p-1 hover:text-primary transition cursor-pointer'
            onClick={() => {
              removeCart(product.ID);
            }}
          >
            {/* <TrashIcon className='w-8 h-8' /> */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
              />
            </svg>
          </span>
        </div>
      </form>
    </div>
  );
}

export default CartItem;
