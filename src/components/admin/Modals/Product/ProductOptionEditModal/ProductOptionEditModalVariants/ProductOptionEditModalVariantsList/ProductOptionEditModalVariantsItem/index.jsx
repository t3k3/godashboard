'use client';
import { useState, useEffect } from 'react';
import { getOptionFromClientSide } from '@/services/option';

function ProductOptionEditModalVariantsItem(props) {
  const [options, setOptions] = useState(props.options);
  const [isChecked, setIsChecked] = useState();
  const [isCheckedStatus, setIsCheckedStatus] = useState();

  const handleChange = (e, check) => {
    if (e.target.name === 'subtract') {
      if (check == 1) {
        setIsChecked(1);
      } else {
        setIsChecked(0);
      }

      props.handleVariantChange(e, props.index, check);
    }

    if (e.target.name === 'status') {
      if (check == 1) {
        setIsCheckedStatus(1);
      } else {
        setIsCheckedStatus(0);
      }

      props.handleVariantChange(e, props.index, check);
    }
  };

  useEffect(() => {
    setIsChecked(props.variant.subtract);
    setIsCheckedStatus(props.variant.status);
  }, []);

  // useEffect(() => {
  //   async function fetchOptions() {
  //     const response = await getOptionFromClientSide();
  //     setOptions(response);
  //   }
  //   fetchOptions();
  // }, []);

  const foundObject = (id) => {
    var foundObject = null;

    for (var i = 0; i < options?.length; i++) {
      var optionValue = options[i].values;
      for (var j = 0; j < optionValue.length; j++) {
        if (optionValue[j].ID === id) {
          foundObject = optionValue[j];
          break;
        }
      }
    }
    return foundObject?.name;
  };

  return (
    <>
      <tr
        className={`${
          isCheckedStatus == 0 ? 'bg-gray-100' : 'bg-white'
        } border-b`}
      >
        <td className='px-4 py-1'>
          <span className='text-xs'>
            <div className='relative my-1 rounded-md shadow-sm'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <span className='text-gray-500 sm:text-sm'>#</span>
              </div>
              <input
                type='text'
                name='barcode'
                value={props.variant?.barcode}
                disabled={isCheckedStatus == 1 ? false : true}
                onChange={(e) => {
                  props.handleVariantChange(e, props.index);
                }}
                className={`${
                  isCheckedStatus == 0 ? 'bg-gray-200' : 'bg-white'
                } block w-32 rounded-md border-0 py-1.5 pl-7  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                placeholder='Barkod...`}
              />
            </div>
          </span>
        </td>
        <th
          scope='row'
          className='flex items-center px-2 py-1 my-1 text-gray-600 whitespace-nowrap'
        >
          <div className='pl-3'>
            <div className='flex items-center py-2 font-semibold'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className={`w-6 h-6 mr-1 border border-gray-400 border-dashed cursor-pointer`}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                />
              </svg>

              {props.variant?.options?.map((opt, index) => {
                return (
                  <span
                    key={index}
                    className={`${
                      isCheckedStatus == 0 ? 'bg-gray-200' : 'bg-white'
                    }  text-gray-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-300`}
                  >
                    {foundObject(opt)}
                  </span>
                );
              })}
            </div>
          </div>
        </th>

        <td className='px-4 py-1'>
          <span className='text-xs'>
            <div className='relative my-1 rounded-md shadow-sm'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <span className='text-gray-500 sm:text-sm'>₺</span>
              </div>
              <input
                type='number'
                name='price'
                value={props.variant?.price}
                disabled={isCheckedStatus == 1 ? false : true}
                onChange={(e) => {
                  props.handleVariantChange(e, props.index);
                }}
                className={`${
                  isCheckedStatus == 0 ? 'bg-gray-200' : 'bg-white'
                } block w-32 rounded-md border-0 py-1.5 pl-7  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                placeholder='0.00`}
              />
            </div>
          </span>
        </td>
        <td className='px-4 py-1'>
          <span className='text-xs'>
            <input
              type='number'
              name='quantity'
              value={props.variant?.quantity}
              disabled={isCheckedStatus == 1 ? false : true}
              onChange={(e) => {
                props.handleVariantChange(e, props.index);
              }}
              className={`${
                isCheckedStatus == 0 ? 'bg-gray-200' : 'bg-white'
              } block w-20 rounded-md border-0 py-1.5 pl-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              placeholder='Stok'
            />
          </span>
        </td>
        <td className='px-2 py-1'>
          <div className='flex items-center'>
            <label className='relative inline-flex items-center mr-5 cursor-pointer'>
              <input
                type='checkbox'
                name='subtract'
                disabled={isCheckedStatus == 1 ? false : true}
                className='sr-only peer'
                onChange={(e) => handleChange(e, isChecked == 1 ? 0 : 1)}
                checked={isChecked == 1 ? true : false}
              />
              <div
                className={` w-11 h-6 bg-gray-300 rounded-full peerpeer-focus:ring-4 peer-focus:ring-purple-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                  isCheckedStatus == 0
                    ? 'peer-checked:bg-gray-300'
                    : 'peer-checked:bg-indigo-600'
                } `}
              ></div>
            </label>
          </div>
        </td>

        <td className='px-2 py-1'>
          <div className='flex items-center'>
            <label className='relative inline-flex items-center mr-5 cursor-pointer'>
              <input
                type='checkbox'
                name='status'
                className='sr-only peer'
                onChange={(e) => handleChange(e, isCheckedStatus == 1 ? 0 : 1)}
                checked={isCheckedStatus == 1 ? true : false}
              />
              <div
                className={`w-11 h-6 bg-gray-300 rounded-full peerpeer-focus:ring-4 peer-focus:ring-purple-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  ${
                  isCheckedStatus == 0
                    ? 'peer-checked:bg-gray-400'
                    : 'peer-checked:bg-green-600'
                }`}
              ></div>
            </label>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ProductOptionEditModalVariantsItem;
