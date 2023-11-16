'use client';
import ProductOptionEditModalVariantsItem from './ProductOptionEditModalVariantsItem';
import { getOptionFromClientSide } from '@/services/option';
import { useState, useEffect } from 'react';

function ProductOptionEditModalVariantsList({ variantList, setVariantList }) {
  const [options, setOptions] = useState();
  // const [selectedFilters, setSelectedFilters] = useState([]);
  // product_option;
  useEffect(() => {
    async function fetchOptions() {
      const response = await getOptionFromClientSide();
      setOptions(response);
    }
    fetchOptions();
  }, []);

  // GET NAME BY OPTION VALUE ID
  const foundObject = (id) => {
    var foundObject = null;

    for (var i = 0; i < options?.length; i++) {
      var optionValue = options[i].option_value;
      for (var j = 0; j < optionValue.length; j++) {
        if (optionValue[j].option_value_id === id) {
          foundObject = optionValue[j];
          break;
        }
      }
    }

    return foundObject?.name;
  };

  const handleVariantChange = (e, id, value) => {
    let temp = [...variantList];
    if (e.target.name == 'subtrack') {
      temp[id] = { ...temp[id], [e.target.name]: value };
    } else if (e.target.name == 'status') {
      temp[id] = { ...temp[id], [e.target.name]: value };
    } else {
      temp[id] = { ...temp[id], [e.target.name]: e.target.value };
    }

    console.log('TEMPPP: ', temp);
    setVariantList(temp);
  };

  console.log('VARIANT LIST 123: ', variantList);

  return (
    <div className='flex bg-white text-gray-600 border rounded overflow-hidden '>
      <div className='mx-4 my-2'>
        <div className=' flex justify-between h-6  text-gray-600 font-medium'>
          <span className='px-2 text-sm font-semibold'>VARYANTLAR</span>
        </div>

        <div className='relative overflow-x-auto sm:rounded-lg py-2 px-0'>
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
                className='block p-2 pl-10 mr-1 text-sm text-gray-500 border border-gray-300 rounded-lg w-40 bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Filtrele...'
              />
            </div>

            {/* FILTER */}

            {/* {product_options?.map((option) => {
              return (
                <select
                  key={option.option_id}
                  id='countries'
                  onChange={(e) => {
                    e.target.value !== '' &&
                      setSelectedFilters((current) => [
                        ...current,
                        e.target.value,
                      ]);
                  }}
                  className='bg-gray-50 border mx-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                >
                  <option selected value={''}>
                    {option.name}
                  </option>
                  {option.product_option_value.map((opt) => {
                    return (
                      <option
                        key={opt.option_value_id}
                        value={opt.option_value_id}
                      >
                        {foundObject(opt.option_value_id)}
                      </option>
                    );
                  })}
                </select>
              );
            })} */}
          </div>
          {/* {console.log('selectedFilters: ', selectedFilters)} */}
          {/* <div className='flex'>
            <div className=' flex mx-4 my-4'>
              Filtreler:
              {selectedFilters !== [] &&
                selectedFilters.map((filter) => {
                  return (
                    <div key={filter} className=''>
                      <span className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-2.5 rounded  border border-blue-400'>
                        {foundObject(filter)}
                      </span>
                    </div>
                  );
                })}
            </div>
            <div className='flex'>
              {' '}
              <span
                className=' bg-red-500 hover:bg-red-400 text-white text-xs font-medium px-1 cursor-pointer ml-4 mr-0 my-2  py-2 rounded  border border-red-400'
                onClick={() => setSelectedFilters([])}
              >
                Filtreleri Temizle
              </span>
            </div>
          </div> */}

          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
              <tr>
                <th scope='col' className='px-4 py-3'>
                  SEÇENEKLER
                </th>
                <th scope='col' className='px-4 py-3'>
                  FİYAT
                </th>
                <th scope='col' className='px-4 py-3'>
                  STOK
                </th>
                <th scope='col' className='px-4 py-3'>
                  STOKTAN DÜŞ
                </th>
                <th scope='col' className='px-4 py-3'>
                  SATIŞ DURUMU
                </th>
              </tr>
            </thead>
            <tbody>
              {variantList != [] &&
                variantList.map((variant, index) => {
                  return (
                    <ProductOptionEditModalVariantsItem
                      key={index}
                      index={index}
                      variant={variant}
                      handleVariantChange={handleVariantChange}
                    />
                  );
                })}
            </tbody>
          </table>

          {/* Pagination */}
          {/* <nav
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
          </nav> */}
        </div>
      </div>
    </div>
  );
}

export default ProductOptionEditModalVariantsList;
