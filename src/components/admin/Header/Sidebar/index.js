import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Sidebar({ isOpen, toggleSidebar }) {
  const pathName = usePathname();
  return (
    <>
      {/* Sidebar */}

      <div
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-white px-8 py-4 border-r overflow-auto z-30 lg:translate-x-0 transform ${
          isOpen
            ? 'translate-x-0 ease-out transition-medium'
            : '-translate-x-full ease-in transition-medium'
        } `}
      >
        <div className='flex items-center justify-between'>
          <Image
            src='/images/logo.png'
            alt='Logo'
            width={36}
            height={36}
            className='w-9 h-9'
          ></Image>
          <button
            className='text-gray-700 lg:hidden'
            onClick={() => toggleSidebar(false)}
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
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <nav className='mt-8'>
          <div>
            <div className='flex items-center justify-between '>
              <h3 className='text-sm font-semibold text-gray-600 uppercase tracking-wide'>
                SİPARİŞLER
              </h3>
              <div className='text-xs font-medium  px-1 py-1'>
                <span>Yeni:</span>
                <span className='bg-green-500 text-white mr-1 px-2 py-1 rounded-full '>
                  2
                </span>
              </div>
            </div>

            <div className='ml-1 mt-2 -mx-3'>
              <Link
                href='/admin/siparisler/liste'
                className={`flex justify-between items-center px-3 py-2 my-0.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-500 hover:rounded-lg  ${
                  pathName.startsWith('/admin/siparisler/liste') &&
                  'text-white bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg '
                }`}
              >
                <span className='text-sm font-medium '>Liste</span>
              </Link>

              <Link
                href='/admin/siparisler/board'
                className={`flex justify-between items-center px-3 py-2 my-0.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-500 hover:rounded-lg  ${
                  pathName.startsWith('/admin/siparisler/board') &&
                  'text-white bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg '
                }`}
              >
                <span className='text-sm font-medium'>Board</span>
              </Link>
            </div>
          </div>

          <div className='mt-8'>
            <div className='flex items-center justify-between '>
              <h3 className='text-sm font-semibold text-gray-600 uppercase tracking-wide'>
                ÜRÜNLER
              </h3>
              <div className='text-xs font-medium  px-1 py-1'>
                <span>Toplam: 123</span>
              </div>
            </div>

            <div className='ml-1 mt-2 -mx-3'>
              <Link
                href='/admin/urunler'
                className={`flex justify-between items-center px-3 py-2 my-0.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-500 hover:rounded-lg  ${
                  pathName.startsWith('/admin/urunler') &&
                  'text-white bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg '
                }`}
              >
                <span className='text-sm font-medium'>Liste</span>
              </Link>
              <Link
                href='/admin/kategoriler'
                className={`flex justify-between items-center px-3 py-2 my-0.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-500 hover:rounded-lg  ${
                  pathName.startsWith('/admin/kategoriler') &&
                  'text-white bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg '
                }`}
              >
                <span className='text-sm font-medium'>Kategoriler</span>
              </Link>
              <Link
                href='/admin/secenekler'
                className={`flex justify-between items-center px-3 py-2 my-0.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-500 hover:rounded-lg  ${
                  pathName.startsWith('/admin/secenekler') &&
                  'text-white bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg '
                }`}
              >
                <span className='text-sm font-medium'>Seçenekler</span>
              </Link>
              <Link
                href='/admin/markalar'
                className={`flex justify-between items-center px-3 py-2 my-0.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-500 hover:rounded-lg  ${
                  pathName.startsWith('/admin/markalar') &&
                  'text-white bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg '
                }`}
              >
                <span className='text-sm font-medium'>Markalar</span>
              </Link>
            </div>
          </div>

          <div className='mt-8'>
            <div className='flex items-center justify-between '>
              <h3 className='text-sm font-semibold text-gray-600 uppercase tracking-wide'>
                MÜŞTERİLER
              </h3>
            </div>

            <div className='ml-1 mt-2 -mx-3'>
              <Link
                href='/admin/musteriler/liste'
                className={`flex justify-between items-center px-3 py-2 my-0.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-500 hover:rounded-lg  ${
                  pathName.startsWith('/admin/musteriler') &&
                  'text-white bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg '
                }`}
              >
                <span className='text-sm font-medium '>Müşteriler</span>
              </Link>
            </div>
          </div>

          <div className='mt-8'>
            <div className='flex items-center justify-between '>
              <h3 className='text-sm font-semibold text-gray-600 uppercase tracking-wide'>
                AYARLAR
              </h3>
            </div>

            <div className='ml-1 mt-2 -mx-3'>
              <Link
                href='/admin/ayarlar'
                className={`flex justify-between items-center px-3 py-2 my-0.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-500 hover:rounded-lg  ${
                  pathName.startsWith('/admin/ayarlar') &&
                  'text-white bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg '
                }`}
              >
                <span className='text-sm font-medium '>Ayarlar</span>
              </Link>
            </div>
            <div className='ml-1 mt-2 -mx-3'>
              <Link
                href='/admin/siparisdurumlari'
                className={`flex justify-between items-center px-3 py-2 my-0.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-500 hover:rounded-lg  ${
                  pathName.startsWith('/admin/siparisdurumlari') &&
                  'text-white bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg '
                }`}
              >
                <span className='text-sm font-medium '>Sipariş Durumları</span>
              </Link>
            </div>
            <div className='ml-1 mt-2 -mx-3'>
              <Link
                href='/admin/muhasebe'
                className={`flex justify-between items-center px-3 py-2 my-0.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-500 hover:rounded-lg  ${
                  pathName.startsWith('/admin/muhasebe') &&
                  'text-white bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg '
                }`}
              >
                <span className='text-sm font-medium '>Muhasebe</span>
              </Link>
            </div>
            <div className='ml-1 mt-2 -mx-3'>
              <Link
                href='/admin/odemeler'
                className={`flex justify-between items-center px-3 py-2 my-0.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-500 hover:rounded-lg  ${
                  pathName.startsWith('/admin/odeme') &&
                  'text-white bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg '
                }`}
              >
                <span className='text-sm font-medium '>Ödemeler</span>
              </Link>
            </div>
            <div className='ml-1 mt-2 -mx-3'>
              <Link
                href='/admin/kargolar'
                className={`flex justify-between items-center px-3 py-2 my-0.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-500 hover:rounded-lg  ${
                  pathName.startsWith('/admin/kargo') &&
                  'text-white bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg '
                }`}
              >
                <span className='text-sm font-medium '>Kargolar</span>
              </Link>
            </div>
          </div>

          <div className='mt-8 hidden'>
            <div className='flex items-center justify-between '>
              <h3 className='text-sm font-semibold text-gray-600 uppercase tracking-wide'>
                PAZARLAMA
              </h3>
            </div>

            <div className='ml-1 mt-2 -mx-3'>
              <Link
                href='/admin/email'
                className={`flex justify-between items-center px-3 py-2 my-0.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-500 hover:rounded-lg  ${
                  pathName.startsWith('/admin/email') &&
                  'text-white bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg '
                }`}
              >
                <span className='text-sm font-medium '>E-Mail</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
