import React from 'react';
import CustomerListItem from './CustomerListItem';

function CustomerList({ customers }) {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg py-2 px-4'>
      <div className='flex items-center py-4 bg-white '>
        <div>
          <button
            id='dropdownActionButton'
            data-dropdown-toggle='dropdownAction'
            className='inline-flex mr-4 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 '
            type='button'
          >
            <span className='sr-only'>Action button</span>
            Duzenle
            <svg
              className='w-3 h-3 ml-2'
              aria-hidden='true'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 9l-7 7-7-7'
              ></path>
            </svg>
          </button>
          {/* Dropdown menu */}
          <div
            id='dropdownAction'
            className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 '
          >
            <ul
              className='py-1 text-sm text-gray-700 '
              aria-labelledby='dropdownActionButton'
            >
              <li>
                <a href='#' className='block px-4 py-2 hover:bg-gray-100 '>
                  Reward
                </a>
              </li>
              <li>
                <a href='#' className='block px-4 py-2 hover:bg-gray-100 '>
                  Promote
                </a>
              </li>
              <li>
                <a href='#' className='block px-4 py-2 hover:bg-gray-100 '>
                  Activate account
                </a>
              </li>
            </ul>
            <div className='py-1'>
              <a
                href='#'
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 '
              >
                Delete User
              </a>
            </div>
          </div>
        </div>
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
      </div>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
          <tr>
            <th scope='col' className='p-4'>
              <div className='flex items-center'>
                <input
                  id='checkbox-all-search'
                  type='checkbox'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                />
                <label htmlFor='checkbox-all-search' className='sr-only'>
                  checkbox
                </label>
              </div>
            </th>
            <th scope='col' className='px-6 py-3'>
              ID
            </th>
            <th scope='col' className='px-6 py-3'>
              İSİM
            </th>
            <th scope='col' className='px-6 py-3'>
              MAİL
            </th>
            <th scope='col' className='px-6 py-3'>
              MÜŞTERİ GRUBU
            </th>
            <th scope='col' className='px-6 py-3'>
              DURUM
            </th>
            <th scope='col' className='px-6 py-3'>
              KAYIT TARİHİ
            </th>
            <th scope='col' className='px-6 py-3'>
              IP ADRESİ
            </th>
            <th scope='col' className='px-6 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            return <CustomerListItem key={customer.ID} customer={customer} />;
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
          <span className='font-semibold text-gray-900 '> Toplam 1000</span>
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

      {/* Edit user modal */}
      <div
        id='editUserModal'
        tabIndex='-1'
        aria-hidden='true'
        className='fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'
      >
        <div className='relative w-full max-w-2xl max-h-full'>
          {/* <!-- Modal content --> */}
          <form action='#' className='relative bg-white rounded-lg shadow'>
            {/* <!-- Modal header --> */}
            <div className='flex items-start justify-between p-4 border-b rounded-t'>
              <h3 className='text-xl font-semibold text-gray-900 '>
                Edit user
              </h3>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center '
                data-modal-hide='editUserModal'
              >
                <svg
                  aria-hidden='true'
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
            </div>
            {/* Modal body */}
            <div className='p-6 space-y-6'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='first-name'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    First Name
                  </label>
                  <input
                    type='text'
                    name='first-name'
                    id='first-name'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                    placeholder='Bonnie'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='last-name'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='last-name'
                    id='last-name'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                    placeholder='Green'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                    placeholder='example@company.com'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='phone-number'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Phone Number
                  </label>
                  <input
                    type='number'
                    name='phone-number'
                    id='phone-number'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                    placeholder='e.g. +(12)3456 789'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='department'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Department
                  </label>
                  <input
                    type='text'
                    name='department'
                    id='department'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                    placeholder='Development'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='company'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Company
                  </label>
                  <input
                    type='number'
                    name='company'
                    id='company'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                    placeholder='123456'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='current-password'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Current Password
                  </label>
                  <input
                    type='password'
                    name='current-password'
                    id='current-password'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                    placeholder='••••••••'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='new-password'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    New Password
                  </label>
                  <input
                    type='password'
                    name='new-password'
                    id='new-password'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                    placeholder='••••••••'
                    required=''
                  />
                </div>
              </div>
            </div>
            {/* Modal footer */}
            <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b '>
              <button
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
              >
                Save all
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerList;
