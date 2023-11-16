import BoardCard from '@/components/admin/Orders/Board/BoardCard';

function Siparisler() {
  return (
    <div>
      {' '}
      {/* Filter */}
      <div className='px-12 flex items-center  py-2'>
        <div className='sm:flex sm:items-center'>
          <h2 className='text-lg font-medium text-gray-900'>Filtrele : </h2>
        </div>
        <div className='ml-8 flex-shrink-0 flex items-center'>
          <button className='ml-1 pl-1 pr-1 py-1 rounded-md flex items-center text-sm font-medium text-white bg-blue-500 hover:bg-blue-600'>
            <span>Bilgisayar</span>
          </button>
          <button className='ml-1 pl-1 pr-1 py-1 rounded-md flex items-center text-sm font-medium text-white bg-blue-500 hover:bg-blue-600'>
            <span>Gömlek</span>
          </button>
          <button className='ml-1 pl-1 pr-1 py-1 rounded-md flex items-center text-sm font-medium text-white bg-blue-500 hover:bg-blue-600'>
            <span>Dürbün</span>
          </button>
        </div>
        {/* Search Bar */}
        <div className='ml-4 relative w-64'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 text-gray-500'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </span>
          <input
            className='block w-full text-sm border border-gray-400 rounded-md py-2 pl-10 pr-4 placeholder-gray-400'
            placeholder='Ürün adı, kodu, müşteri ismi...'
          />
        </div>
        {/* CheckBox */}
        <div className='ml-4 flex items-center'>
          <input
            id='checked-checkbox'
            type='checkbox'
            value=''
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          />
          <label
            htmlFor='checked-checkbox'
            className='ml-2 text-sm font-medium text-gray-500'
          >
            Tamamlananları Dahil Et
          </label>
        </div>
      </div>
      {/* Main Content */}
      <div className='flex-1 bg-gray-50 overflow-auto'>
        <main className='p-3 h-full inline-flex space-x-2 overflow-hidden'>
          {/* To Do */}
          <div className='flex flex-col w-80 bg-transparent rounded-md'>
            <h3 className='px-3 pt-3 pb-1 text-md font-medium text-gray-700 leading-tight font-mono'>
              Yeni Siparişler
            </h3>
            <div className='flex-1 min-h-0 overflow-y-auto'>
              <ul className='pt-1 pb-3 px-3'>
                <BoardCard />
                <BoardCard />
              </ul>
            </div>
          </div>
          {/* In Progress */}
          <div className='flex flex-col w-80 bg-transparent rounded-md'>
            <h3 className='px-3 pt-3 pb-1 text-md font-medium text-gray-700 leading-tight font-mono'>
              Hazırlanıyor
            </h3>
            <div className='flex-1 min-h-0 overflow-y-auto'>
              <ul className='pt-1 pb-3 px-3'>
                <BoardCard />
                <BoardCard />
                <BoardCard />
              </ul>
            </div>
          </div>
          {/* Testing */}
          <div className='flex flex-col w-80 bg-transparent rounded-md'>
            <h3 className='px-3 pt-3 pb-1 text-md font-medium text-gray-700 leading-tight font-mono'>
              Kargoya Verildi
            </h3>
            <div className='flex-1 min-h-0 overflow-y-auto'>
              <ul className='pt-1 pb-3 px-3'>
                <BoardCard />
                <BoardCard />
                <BoardCard />
                <BoardCard />
                <BoardCard />
              </ul>
            </div>
          </div>
          {/* Done */}
          <div className='flex flex-col w-80 bg-transparent rounded-md'>
            <h3 className='px-3 pt-3 pb-1 text-md font-medium text-gray-700 leading-tight font-mono'>
              Tamamlandı
            </h3>
            <div className='flex-1 min-h-0 overflow-y-auto'>
              <ul className='pt-1 pb-3 px-3'>
                <BoardCard />
                <BoardCard />
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Siparisler;
