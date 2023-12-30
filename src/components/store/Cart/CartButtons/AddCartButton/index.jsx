'use client';
import React from 'react';
import Link from 'next/link';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from '@/services/store/cart';
import AddFavorilerButton from '../AddFavorilerButton';
import CartSlider from '../../CartSlider';

function findProductCombination(productCombinations, selectedOptions) {
  // Seçilen seçenekleri içeren product_combination nesnesini bul
  const matchingCombination = productCombinations.find((combination) => {
    return selectedOptions.option.every((selectedOption) => {
      const foundOption = combination.options.find(
        (combOption) => combOption.name === selectedOption.name
      );
      return foundOption && foundOption.value === selectedOption.value;
    });
  });

  // Eğer eşleşen bir product_combination varsa, nesneyi döndür
  // return matchingCombination ? matchingCombination : null;
  return matchingCombination;
}

function AddCartButton({ product }) {
  const notify = () =>
    toast.success('Ürün sepete eklendi!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const [productCount, setProductCount] = useState(1);
  const [warnings, setWarnings] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  var selectedOptionValues = [];
  // console.log('PRODUCT options: ', product.options);

  product.product_options.forEach((element) => {
    selectedOptionValues.push({
      name: element.name,
      value: searchParams.get(element.name),
    });
  });

  //arr seçilen varyantın name ve value değerlerini altaşırır
  let arr = { option: selectedOptionValues };

  // console.log('seçilen seçenekler arr: ', arr);

  const increaseProductCount = () => {
    if (product.quantity <= productCount) {
      return;
    }
    setProductCount(productCount + 1);
  };

  const decreaseProductCount = () => {
    if (productCount < 2) {
      return;
    }
    setProductCount(productCount - 1);
  };

  // console.log('AddCartButton component X: ', cartItems);

  // const variants = product.product_combinations;

  // const combinations = variants.map((variant) => ({
  //   id: variant.ID,
  //   availableForSale: variant.quantity > 0 && variant.status,
  //   options: variant.options.reduce(
  //     (acc, option) => ({
  //       ...acc,
  //       [option.name]: option.value,
  //     }),
  //     {}
  //   ),
  // }));

  // console.log('combinations FROM ADD TO CART: ', combinations);

  // product_combinations ve arr nesnelerinizi kullanarak fonksiyonu çağırın

  const selectedCombination = findProductCombination(
    product.product_combinations,
    arr
  );

  // console.log('Seçilen Product Combination:', selectedCombination);

  const addCart = async (product_id) => {
    //arr içinde value alanında null varsa return et ve warning içine boş olan value nesnesinin name'ini yazdır. null olanların tümünün name'ini yazdır.
    if (arr.option.some((e) => e.value === null)) {
      let nullValues = arr.option.filter((e) => e.value === null);
      let nullValuesNames = nullValues.map((e) => e.name);
      setWarnings({
        option: nullValuesNames.reduce(
          (acc, name) => ({ ...acc, [name]: `Lütfen ${name} seçiniz.` }),
          {}
        ),
      });
      return;
    }
    setWarnings(false);

    const data = {
      product_id: product_id,
      quantity: productCount,
      //option karşısındaki değer string olmalı
      option: JSON.stringify(arr.option),
      // option: '',
      option_id: selectedCombination?.ID,
      user_id: 0,
    };

    console.log('DATA43534: ', data);

    setIsUpdate(true);

    const response = await addToCart(data);

    console.log('response43332443324: ', response.cart);

    // if (response) {
    //   // setWarnings(response.error);
    //   setIsUpdate(false);
    //   return;
    // }
    if (response.status === 201) {
      setOpen(true); // CartSlider'ı aç
      setCart(response.cart);
      setIsUpdate(false);
    }

    notify();

    router.refresh();
    setProductCount(1);
    setIsUpdate(false);
  };
  // console.log('AddCartButton component X: ', cartItems);
  return (
    <div className='space-y-4 border-b border-gray-200 pb-5 mt-6'>
      {warnings
        ? warnings.option &&
          Object.entries(warnings.option).map(([optionId, optionText]) => {
            console.log(`Option ID: ${optionId}, Option Text: ${optionText}`);
            return (
              <p key={optionId} className='text-md text-red-500 mt-2'>
                {optionText}
              </p>
            );
          })
        : null}

      <CartSlider cart={cart} open={open} setOpen={setOpen} />

      {/* QUANTITY */}

      {/* TOAST */}

      <ToastContainer />
      {/* TOAST END */}

      {/* ALERT */}
      {/* <div
        id='toast-default'
        className='fixed top-2 right-2 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow'
        role='alert'
      >
        <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg '>
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
              d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
            />
          </svg>
        </div>
        <div className='ml-3 text-sm font-normal'>Ürün sepete eklendi</div>
        <button
          type='button'
          className='ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 '
          data-dismiss-target='#toast-default'
          aria-label='Close'
        >
          <span className='sr-only'>Close</span>
          <svg
            className='w-3 h-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
            />
          </svg>
        </button>
      </div> */}
      {/* ALERT END */}

      <div className='flex items-baseline mb-1 space-x-2 font-roboto mt-4'>
        {product.special ? (
          <>
            <p className='text-2xl text-primary font-semibold'>
              {product.special}
            </p>
            <p className='text-base text-gray-400 line-through'>
              {product.price}
            </p>
          </>
        ) : (
          <p className='text-3xl text-primary font-semibold'>
            {selectedCombination
              ? selectedCombination.price
                  .toLocaleString('tr-TR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                  .replace('.', ',')
              : product.price &&
                product.price
                  .toLocaleString('tr-TR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                  .replace('.', ',')}{' '}
            TL
          </p>
        )}
      </div>

      <div className='mt-4'>
        <h3 className='text-md text-gray-800 mb-3 uppercase font-medium'>
          Adet
        </h3>
        <div className='flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max'>
          <span
            className='h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none'
            onClick={() => decreaseProductCount()}
          >
            -
          </span>
          <div className='h-8 w-8 text-base flex items-center justify-center'>
            {productCount}
          </div>
          <span
            className='h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none'
            onClick={() => increaseProductCount()}
          >
            +
          </span>
        </div>
        <p
          className={`text-sm text-red-500 mt-2 ${
            productCount >= product.quantity ? 'block' : 'hidden'
          }`}
        >
          Maksimum satın alma sınırına ulaştınız. Bu üründen daha fazla satın
          alamazsınız.
        </p>
      </div>

      {warnings
        ? warnings.stock_error && (
            <p className='text-sm text-red-500 mt-2'>{warnings.stock_error}</p>
          )
        : null}

      <div className='flex space-x-2'>
        <div>
          {/* QUANTITY END */}
          {product.quantity != 0 ? (
            <button
              disabled={isUpdate}
              className={`${
                isUpdate && 'opacity-75'
              } bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition`}
              onClick={() => addCart(product.ID)}
            >
              {isUpdate && (
                <div
                  className='inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                  role='status'
                ></div>
              )}
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
                  d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                />
              </svg>
              sepete ekle
            </button>
          ) : (
            <Link
              href={'#'}
              className='bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition'
            >
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
                  d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                />
              </svg>
              GELİNCE HABER VER
            </Link>
          )}
        </div>
        {/* ZUSTAND Favoriler Test  */}
        <AddFavorilerButton />
        {/* <div>
          <Link
            href={'#'}
            className='border border-gray-300 text-gray-600 px-4 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary  transition'
          >
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
                d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
              />
            </svg>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default AddCartButton;
