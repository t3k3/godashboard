'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import POSProductItem from './POSProductItem';
import POSCartItem from './POSCartItem';
import POSCheckoutModal from './POSCheckoutModal';

import { getOptions } from '@/services/option';

// function processProducts(rawProducts) {
//   let products = [];

//   rawProducts.forEach((product) => {
//     // Ana ürünü products dizisine ekle
//     products.push(product);

//     // Varyantları kontrol et
//     product.product_combinations.forEach((variant) => {
//       if (variant.status && variant.quantity > 0 && variant.barcode !== '') {
//         // Varyantı ayrı bir ürün olarak ele al ve products dizisine ekle
//         const productVariant = {
//           ...product, // Ana ürünün özelliklerini kopyala
//           variantId: variant.barcode, // Varyantın ID'si
//           variantOptions: variant.options, // Varyantın seçenekleri
//           price: variant.price, // Varyantın fiyatı
//           quantity: variant.quantity, // Varyantın miktarı
//           barcode: variant.barcode, // Varyantın barkodu
//         };
//         products.push(productVariant);
//       }
//     });
//   });

//   return products;
// }

function processProducts(rawProducts, options) {
  let products = [];

  rawProducts.forEach((product) => {
    let hasValidVariants = false;

    // Varyantları kontrol et
    product.product_combinations.forEach((variant) => {
      if (variant.status && variant.quantity > 0 && variant.barcode !== '') {
        // Varyantın etiketlerini bul
        const etiketler = variant.options
          .map((optionId) => {
            const option = options.find((o) =>
              o.values.some((v) => v.ID === optionId)
            );
            return option
              ? option.values.find((v) => v.ID === optionId).name
              : null;
          })
          .filter((name) => name !== null);

        // Varyantı ayrı bir ürün olarak ele al ve products dizisine ekle
        const productVariant = {
          ...product, // Ana ürünün özelliklerini kopyala
          variantId: variant.barcode, // Varyantın ID'si
          variantOptions: variant.options, // Varyantın seçenekleri
          etiketler: etiketler, // Varyantın etiketleri
          price: variant.price, // Varyantın fiyatı
          quantity: variant.quantity, // Varyantın miktarı
          barcode: variant.barcode, // Varyantın barkodu
          subtract: variant.subtract, // Varyantın subtract değeri
        };
        products.push(productVariant);
        hasValidVariants = true;
      }
    });

    // Eğer ürünün geçerli varyantları yoksa, ana ürünü listeye ekle
    if (!hasValidVariants) {
      products.push(product);
    }
  });

  return products;
}

function POSPage(props) {
  const [products, setProducts] = useState([]);

  console.log('products14134324: ', products);

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [income, setIncome] = useState(0);
  const [posCheckoutModal, setPosCheckoutModal] = useState(false);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      return acc + item.price * item.sold;
    }, 0);
    setTotal(total);
  }, [cart]);

  useEffect(() => {
    const getOptionsData = async () => {
      const { options } = await getOptions();
      setProducts(processProducts(props.products, options));
      setOptions(options);
    };
    getOptionsData();
  }, []);

  // const posAddToCart = (product) => {
  //   const existingProduct = cart.find(
  //     (item) => item.barcode === product.barcode
  //   );

  //   if (existingProduct) {
  //     // Increase the sold quantity of the existing product
  //     existingProduct.sold += 1;
  //     setCart([...cart]);
  //   } else {
  //     // Add the product to the cart with a sold quantity of 1
  //     const productWithSoldQuantity = { ...product, sold: 1 };
  //     setCart((prevCart) => [...prevCart, productWithSoldQuantity]);
  //   }
  // };

  const posAddToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.barcode === product.barcode
    );

    if (existingProduct) {
      // Stok kontrolü yap (subtract özelliği true ise)
      if (product.subtract && existingProduct.sold >= product.quantity) {
        // Stokta yeterli miktar yoksa, uyarı ver
        alert('Yetersiz stok!');
      } else {
        // Stokta yeterli miktar varsa veya subtract false ise, satılan miktarı artır
        existingProduct.sold += 1;
        setCart([...cart]);
      }
    } else {
      // Ürün sepette yoksa, yeni ürün olarak ekle
      const productWithSoldQuantity = { ...product, sold: 1 };
      setCart((prevCart) => [...prevCart, productWithSoldQuantity]);
    }
  };

  const increaseCartQuantity = (product) => {
    const existingProduct = cart.find(
      (item) => item.barcode === product.barcode
    );

    // Subtract özelliği true ise stok kontrolü yap
    if (product.subtract) {
      if (existingProduct.sold < product.quantity) {
        // Stokta yeterli miktar varsa, satılan miktarı artır
        existingProduct.sold += 1;
        setCart([...cart]);
      } else {
        // Stokta yeterli miktar yoksa, uyarı ver
        alert('Stok miktarı aşıldı!');
      }
    } else {
      // Subtract özelliği false ise stok kontrolü yapmadan miktarı artır
      existingProduct.sold += 1;
      setCart([...cart]);
    }
  };

  const decreaseCartQuantity = (product) => {
    if (product.sold === 1) {
      const updatedCart = cart.filter(
        (item) => item.barcode !== product.barcode
      );
      setCart(updatedCart);
      return;
    }
    const existingProduct = cart.find(
      (item) => item.barcode === product.barcode
    );
    existingProduct.sold -= 1;
    setCart([...cart]);
  };

  return (
    <div className='flex flex-row h-screen overflow-y-scroll antialiased text-blue-800 bg-gray-100 '>
      {posCheckoutModal && (
        <POSCheckoutModal
          cart={cart}
          setPosCheckoutModal={setPosCheckoutModal}
        />
      )}
      <div className='flex flex-row w-auto flex-shrink-0 pl-4 pr-2 py-4 '>
        <div className='flex flex-col items-center py-4 flex-shrink-0 w-20 bg-cyan-500 rounded-3xl'>
          <a
            href='/admin'
            className='flex items-center justify-center h-12 w-12 bg-cyan-50 text-cyan-700 rounded-full'
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
                d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
              />
            </svg>
          </a>
          <ul className='flex flex-col space-y-2 mt-12'>
            <li>
              <a href='#' className='flex items-center'>
                <span className='flex items-center justify-center h-12 w-12 rounded-2xl'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
                    />
                  </svg>
                </span>
              </a>
            </li>
          </ul>
          <Link
            href='#'
            target='_blank'
            className='mt-auto flex items-center justify-center text-cyan-200 hover:text-cyan-100 h-10 w-10 focus:outline-none'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clipRule='evenodd'
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* <!-- page content --> */}
      <div className='flex-grow flex'>
        {/* <!-- store menu --> */}
        <div className='flex flex-col bg-gray-100 h-full w-full py-4'>
          <div className='flex px-2 flex-row relative '>
            <div className='absolute left-5 top-3 px-2 py-2 rounded-full bg-cyan-500 text-white'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <input
              type='text'
              className='bg-white rounded-3xl text-gray-800 shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none'
              placeholder='Ara ...'
              x-model='keyword'
            />
          </div>

          <div className='h-full overflow-hidden mt-4 '>
            <div className='h-full overflow-y-auto px-2'>
              {products.length === 0 ? (
                <div
                  className='select-none bg-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25'
                  x-show='products.length === 0'
                >
                  <div className='w-full text-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-24 w-24 inline-block'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
                      />
                    </svg>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-24 w-24 inline-block'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                      />
                    </svg>
                    <p className='text-xl'>
                      HİÇ ÜRÜN
                      <br />
                      BULUNAMADI
                    </p>
                  </div>
                </div>
              ) : (
                <div className='grid grid-cols-6 gap-4 pb-3'>
                  {products.length > 0 &&
                    products.map((product) => (
                      <POSProductItem
                        key={product.barcode}
                        product={product}
                        options={options}
                        posAddToCart={posAddToCart}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='w-5/12 flex flex-col bg-gray-100 h-full pr-4 pl-2 py-4'>
          <div className='bg-white rounded-3xl flex flex-col h-full shadow-xl'>
            {/* <!-- empty cart --> */}
            {cart.length === 0 ? (
              <div
                x-show='cart.length === 0'
                className='flex-1 w-full p-4 opacity-25 select-none flex flex-col flex-wrap content-center justify-center'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-16 inline-block'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
                <p>SEPET BOŞ</p>
              </div>
            ) : (
              <div className='flex-1 flex flex-col overflow-auto'>
                <div className='h-16 text-center flex justify-center'>
                  <div className='pl-8 text-left text-lg py-4 relative'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 inline-block'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                      />
                    </svg>
                    <div className='text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3'>
                      {cart.length}
                    </div>
                  </div>
                  <div className='flex-grow px-8 text-right text-lg py-4 relative'>
                    <button
                      className='text-gray-400 hover:text-pink-500 focus:outline-none'
                      onClick={() => setCart([])}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 inline-block'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {cart.map((product) => (
                  <POSCartItem
                    key={product.barcode}
                    product={product}
                    increaseCartQuantity={increaseCartQuantity}
                    decreaseCartQuantity={decreaseCartQuantity}
                  />
                ))}
              </div>
            )}

            {/* <!-- payment info --> */}
            <div className='select-none h-auto w-full text-center pt-3 pb-4 px-4'>
              <div className='flex mb-3 text-lg font-semibold text-gray-700'>
                <div>TOTAL</div>
                <div className='text-right w-full'>
                  ₺
                  {total.toLocaleString('tr-TR', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </div>
              </div>
              <div className='mb-3 text-gray-700 px-3 pt-2 pb-3 rounded-lg bg-gray-100'>
                <div className='flex text-lg font-semibold'>
                  <div className='flex-grow text-left my-auto'>ALINAN</div>
                  <div className='flex text-right'>
                    <div className='mr-2 my-auto'>₺</div>
                    <input
                      type='text'
                      className='w-28 text-right bg-white shadow rounded-lg focus:bg-white focus:shadow-lg px-2 focus:outline-none'
                      placeholder='0'
                      onChange={(e) => setIncome(e.target.value)}
                    />
                  </div>
                </div>
                <hr className='my-2' />
                <div className='grid grid-cols-3 gap-2 mt-2'>
                  <div x-for='money in moneys'>
                    <button className='bg-white rounded-lg shadow hover:shadow-lg focus:outline-none inline-block px-2 py-1 text-sm'>
                      +<span x-text='numberFormat(money)'>1000</span>
                    </button>
                    <button className='bg-white rounded-lg shadow hover:shadow-lg focus:outline-none inline-block px-2 py-1 text-sm'>
                      +<span x-text='numberFormat(money)'>2000</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className='flex mb-3 text-lg font-semibold bg-pink-100 text-gray-700 rounded-lg py-2 px-3'>
                PARA ÜSTÜ
                <div className='text-right flex-grow text-pink-600'>
                  ₺
                  {(income - total).toLocaleString('tr-TR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>

              <button
                className='text-white bg-blue-400 rounded-2xl text-lg w-full py-3 focus:outline-none'
                onClick={() => cart.length > 0 && setPosCheckoutModal(true)}
              >
                ÖDEME
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default POSPage;
