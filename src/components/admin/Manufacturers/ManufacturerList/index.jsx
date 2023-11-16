'use client';
import { useState } from 'react';
import ManufacturerListItem from './ManufacturerListItem';
import EditManufacturerModal from './EditManufacturerModal';
import AddNewManufacturerModal from './AddNewManufacturerModal';
import { getSingleManufacturer } from '@/services/manufacturer';

function ManufacturerList(props) {
  const [manufacturers, setManufacturers] = useState(props.manufacturers);
  const [addNewManufacturerModal, setAddNewManufacturerModal] = useState(false);
  const [editManufacturerModal, setEditManufacturerModal] = useState(false);
  const [editManufacturer, setEditManufacturer] = useState(false);

  const handleManufacturerEdit = async (index) => {
    const manufacturer = await getSingleManufacturer(index);
    setEditManufacturer(manufacturer);

    manufacturer && setEditManufacturerModal(true);
  };

  return (
    <div className='flex-1 bg-white text-gray-600 rounded overflow-hidden shadow-lg border'>
      {/* ADD NEW MANUFACTURER MODAL */}
      {addNewManufacturerModal ? (
        <AddNewManufacturerModal
          // product={product}
          // setProduct={setProduct}
          closeModal={setAddNewManufacturerModal}
        />
      ) : null}

      {/* EDİT MANUFACTURER MODAL */}
      {editManufacturerModal ? (
        <EditManufacturerModal
          // product={product}
          // setProduct={setProduct}
          editManufacturer={editManufacturer}
          closeModal={setEditManufacturerModal}
        />
      ) : null}

      <div className='mx-4 my-2'>
        <div className=' flex justify-between h-6  text-gray-600 font-medium'>
          <span className='px-2 text-sm font-semibold'>Markalar</span>
        </div>

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg py-2 px-4'>
          <div className='flex items-center py-4 bg-white '>
            <label htmlFor='table-search' className='sr-only'>
              Search
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  className='w-5 h-5 text-gray-500'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </div>
              <input
                type='text'
                className='block p-2 pl-10 text-sm text-gray-500 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Ara...'
              />
            </div>
            <button
              type='button'
              className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mr-16 mt-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mx-16'
              onClick={() => {
                setAddNewManufacturerModal(true);
              }}
            >
              Yeni
            </button>
          </div>
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  ID
                </th>

                <th scope='col' className='px-6 py-3'>
                  İSİM
                </th>
                <th scope='col' className='px-6 py-3'>
                  RESİM
                </th>
                <th scope='col' className='px-6 py-3'>
                  SIRALAMA
                </th>

                <th scope='col' className='px-6 py-3'></th>
              </tr>
            </thead>
            <tbody>
              {manufacturers &&
                manufacturers.map((manufacturer) => {
                  return (
                    <ManufacturerListItem
                      key={manufacturer.manufacturer_id}
                      manufacturer={manufacturer}
                      handleManufacturerEdit={handleManufacturerEdit}
                    />
                  );
                })}
            </tbody>
          </table>

          {/* Pagination */}
          <nav
            className='flex items-center justify-between pt-4 mb-4 px-6'
            aria-label='Table navigation'
          >
            <span className='text-sm font-normal text-gray-500'>
              <span className='font-semibold text-gray-900 '> 1-10</span> arasi{' '}
              <span className='font-semibold text-gray-900 '>
                {' '}
                Toplam {props.manufacturer_total}
              </span>
            </span>
            <ul className='inline-flex items-center -space-x-px'>
              <li>
                <a
                  href='#'
                  className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 '
                >
                  <span className='sr-only'>Onceki</span>
                  <svg
                    className='w-5 h-5'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href='#'
                  aria-current='page'
                  className='z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                >
                  100
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 '
                >
                  <span className='sr-only'>Sonraki</span>
                  <svg
                    className='w-5 h-5'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ManufacturerList;
