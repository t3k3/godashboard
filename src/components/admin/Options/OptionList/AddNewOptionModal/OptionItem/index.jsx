import React from 'react';
import { useState } from 'react';
import Image from 'next/image';

function OptionItem({
  optionValues,
  handleOptionValueChange,
  handleRemoveOptionValue,
}) {
  return (
    <table className='min-w-full divide-y divide-gray-200'>
      <thead>
        <tr>
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          >
            Seçenek Değer Adı
          </th>
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          >
            Seçenek Resmi
          </th>
          <th scope='col' className='relative px-6 py-3'>
            <span className='sr-only'>Sil</span>
          </th>
        </tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        {optionValues.map((optionValue, index) => (
          <tr key={index}>
            <td className='px-6 py-4 whitespace-nowrap'>
              <input
                type='text'
                name={`name-${index}`}
                value={optionValue.name}
                onChange={(e) => handleOptionValueChange(index, e.target.value)}
                className='block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
              />
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
              {/* Resim yükleme inputu burada olacak */}
              <input
                type='file'
                name={`image-${index}`}
                className='block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
              />
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
              <button
                onClick={() => handleRemoveOptionValue(index)}
                className='text-red-600 hover:text-red-900'
              >
                Sil
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OptionItem;
