import Breadcrums from '@/components/store/Breadcrums';
import React from 'react';
import Image from 'next/image';

function Hesap() {
  return (
    <>
      <Breadcrums
        breadcrumbs={[
          { href: '/', text: '' },
          { href: '/hesap', text: 'Hesap' },
        ]}
      />

      <div className='container grid grid-cols-12 items-start gap-6 pt-4 pb-16'>
        <div className='col-span-3'>
          <div className='px-4 py-3 shadow flex items-center gap-4'>
            <div className='flex-shrink-0'>
              <Image
                src='/images/no_image-100x100.webp'
                alt='profile'
                width={56}
                height={56}
                className='rounded-full w-14 h-14 border border-gray-200 p-1 object-cover'
              />
            </div>
            <div className='flex-grow'>
              <p className='text-gray-600'>Merhaba,</p>
              <h4 className='text-gray-800 font-medium'>John Doe</h4>
            </div>
          </div>

          <div className='mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600'>
            <div className='space-y-1 pl-8'>
              <a
                href='#'
                className='relative text-primary block font-medium capitalize transition'
              >
                <span className='absolute -left-8 top-0 text-base'>
                  <i className='fa-regular fa-address-card'></i>
                </span>
                Hesap Yönetimi
              </a>
              <a
                href='#'
                className='relative hover:text-primary block capitalize transition'
              >
                Profil Bilgileri
              </a>
              <a
                href='#'
                className='relative hover:text-primary block capitalize transition'
              >
                Adres Yönetimi
              </a>
              <a
                href='#'
                className='relative hover:text-primary block capitalize transition'
              >
                Parola Değiştir
              </a>
            </div>

            <div className='space-y-1 pl-8 pt-4'>
              <a
                href='#'
                className='relative hover:text-primary block font-medium capitalize transition'
              >
                <span className='absolute -left-8 top-0 text-base'>
                  <i className='fa-solid fa-box-archive'></i>
                </span>
                Şiparişlerim
              </a>
              <a
                href='#'
                className='relative hover:text-primary block capitalize transition'
              >
                İade ve İptal Taleplerim
              </a>

              <a
                href='#'
                className='relative hover:text-primary block capitalize transition'
              >
                Yorumlarım
              </a>
            </div>

            <div className='space-y-1 pl-8 pt-4'>
              <a
                href='#'
                className='relative hover:text-primary block font-medium capitalize transition'
              >
                <span className='absolute -left-8 top-0 text-base'>
                  <i className='fa-regular fa-credit-card'></i>
                </span>
                Ödeme Metodlarım
              </a>
            </div>

            <div className='space-y-1 pl-8 pt-4'>
              <a
                href='#'
                className='relative hover:text-primary block font-medium capitalize transition'
              >
                <span className='absolute -left-8 top-0 text-base'>
                  <i className='fa-regular fa-heart'></i>
                </span>
                Favorilerim
              </a>
            </div>

            <div className='space-y-1 pl-8 pt-4'>
              <a
                href='#'
                className='relative hover:text-primary block font-medium capitalize transition'
              >
                <span className='absolute -left-8 top-0 text-base'>
                  <i className='fa-regular fa-arrow-right-from-bracket'></i>
                </span>
                Çıkış Yap
              </a>
            </div>
          </div>
        </div>

        <div className='col-span-9 grid grid-cols-3 gap-4'>
          <div className='shadow rounded bg-white px-4 pt-6 pb-8'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-medium text-gray-800 text-lg'>Profilim</h3>
              <a href='#' className='text-primary'>
                Düzenle
              </a>
            </div>
            <div className='space-y-1'>
              <h4 className='text-gray-700 font-medium'>John Doe</h4>
              <p className='text-gray-800'>example@mail.com</p>
              <p className='text-gray-800'>0811 8877 988</p>
            </div>
          </div>

          <div className='shadow rounded bg-white px-4 pt-6 pb-8'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-medium text-gray-800 text-lg'>
                Kargo Adresim
              </h3>
              <a href='#' className='text-primary'>
                Düzenle
              </a>
            </div>
            <div className='space-y-1'>
              <h4 className='text-gray-700 font-medium'>John Doe</h4>
              <p className='text-gray-800'>Medan, North Sumatera</p>
              <p className='text-gray-800'>20371</p>
              <p className='text-gray-800'>0811 8877 988</p>
            </div>
          </div>

          <div className='shadow rounded bg-white px-4 pt-6 pb-8'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-medium text-gray-800 text-lg'>
                Fatura Adresim
              </h3>
              <a href='#' className='text-primary'>
                Düzenle
              </a>
            </div>
            <div className='space-y-1'>
              <h4 className='text-gray-700 font-medium'>John Doe</h4>
              <p className='text-gray-800'>Medan, North Sumatera</p>
              <p className='text-gray-800'>20317</p>
              <p className='text-gray-800'>0811 8877 988</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hesap;
