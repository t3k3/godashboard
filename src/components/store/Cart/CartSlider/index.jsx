'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CartSlider({ cart = [], open, setOpen }) {
  const pathName = usePathname();
  //   const [open, setOpen] = useState(isOpen);

  // console.log('cart 555666', cart);

  // CartSlider'ı sadece belirli sayfalarda açılmasını kontrol et
  if (
    pathName === '/sepet' ||
    pathName === '/odeme' ||
    pathName === '/checkout' ||
    pathName === '/payment'
  ) {
    return null; // Sayfa uygun değilse null döndürerek bileşeni görüntüleme
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium text-gray-900'>
                          Alışveriş Sepetiniz
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='relative -m-2 p-2 text-gray-400 hover:text-gray-500'
                            onClick={() => setOpen(false)}
                          >
                            <span className='absolute -inset-0.5' />
                            <span className='sr-only'>Kapat</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>

                      <div className='mt-8'>
                        <div className='flow-root'>
                          <ul
                            role='list'
                            className='-my-6 divide-y divide-gray-200'
                          >
                            {cart?.cart_items?.map((product) => (
                              <li key={product.ID} className='flex py-6'>
                                <div className='relative h-24 w-24 flex-shrink-0 overflow-visible rounded-md border border-gray-200'>
                                  <div className='absolute top-0 right-0 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full transform -translate-y-2 translate-x-2'>
                                    {product.quantity}
                                  </div>
                                  <Image
                                    src={
                                      `/${product.thumb}` ||
                                      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg'
                                    }
                                    alt={'product.imageAlt'}
                                    width={96}
                                    height={96}
                                    className='h-full w-full object-cover object-center'
                                  />
                                </div>

                                <div className='ml-4 flex flex-1 flex-col'>
                                  <div>
                                    <div className='flex justify-between text-base font-medium text-gray-900'>
                                      <h3>
                                        <a href={product.ID}>{product.name}</a>
                                      </h3>
                                      <p className='ml-4'>
                                        {product.quantity > 1
                                          ? product.quantity +
                                            ' x ' +
                                            product.price.toLocaleString(
                                              'tr-TR',
                                              {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                              }
                                            )
                                          : product.price.toLocaleString(
                                              'tr-TR',
                                              {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                              }
                                            )}{' '}
                                        TL
                                      </p>
                                    </div>
                                    {product.option_id > 0 &&
                                      JSON.parse(product.option).map((opt) => {
                                        return (
                                          <p
                                            key={opt.name}
                                            className='mt-1 text-sm text-gray-500'
                                          >
                                            {opt.name}: {opt.value}
                                          </p>
                                        );
                                      })}
                                    {/* <p className='mt-1 text-sm text-gray-500'>
                                      {product.color || 'No color'}
                                    </p> */}
                                  </div>
                                  <div className='flex flex-1 items-end justify-between text-sm'>
                                    <p className='text-gray-500'>
                                      Adet {product.quantity}
                                    </p>

                                    <div className='flex'>
                                      <button
                                        type='button'
                                        className='font-medium text-indigo-600 hover:text-indigo-500'
                                      >
                                        Kaldır
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                      <div className='flex justify-between text-base font-medium text-gray-900'>
                        <p>Toplam</p>
                        <p className='text-primary font-semibold text-xl'>
                          ₺
                          {cart.totals?.total?.toLocaleString('tr-TR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <p className='mt-0.5 text-sm text-gray-500'>
                        Vergiler dahil toplam fiyat
                      </p>
                      <div className='mt-6'>
                        <Link
                          href={'/sepet'}
                          className='flex items-center justify-center rounded-md border bg-primary focus:outline-none border-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:text-primary hover:bg-transparent transition'
                        >
                          Alışverişi tamamla
                        </Link>
                      </div>
                      <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                        <p>
                          ya da &nbsp;
                          <button
                            type='button'
                            className='font-medium text-indigo-600 hover:text-indigo-500'
                            onClick={() => setOpen(false)}
                          >
                            Alışverişe devam et
                            <span aria-hidden='true'> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
