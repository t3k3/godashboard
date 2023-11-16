'use client';
import React, { useState, useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';

function ProductTrendyolEditModalCategoriesSelect({
  product,
  selected,
  setSelected,
}) {
  const [categories, setCategories] = useState();

  const [inputValue, setInputValue] = useState('');
  //const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function fetchAttributes(data) {
      setSelected(data);
    }
    fetchAttributes({
      cid: product?.product_pazaryeri[1]?.pazaryerikategoriid,
      name: product?.product_pazaryeri[1]?.pazaryerikategoriadi,
    });
  }, []);

  const getCategories = () => {
    fetch(`http://localhost:3000/categories.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        setOpen(!open);
      });
  };

  function getClick() {
    return Promise.all([getCategories()]).then(() => {});
  }

  return (
    <div className='w-full px-3 font-medium h-15'>
      <label
        className='block uppercase tracking-wide my-5 text-gray-700 text-xs font-bold mb-2'
        htmlFor='grid-zip'
      >
        Kategori
      </label>
      <div
        onClick={() => {
          getClick();
        }}
        className={`bg-gray-50 border  w-full shadow p-2 flex items-center justify-between rounded ${
          !selected && 'text-gray-700'
        }`}
      >
        {/* {selected
? selected?name.length > 25
? selected?.substring(0, 25) + '...'
: selected
: 'Select Country'} */}

        {selected ? selected.name : 'Kategori Seçiniz...'}

        <BiChevronDown size={20} className={`${open && 'rotate-180'}`} />
      </div>
      <ul
        className={` bg-gray-50 mt-2 overflow-y-auto fixed w-200 ${
          open ? 'max-h-60' : 'max-h-0'
        } `}
      >
        <div className='flex items-center px-2 top-0 bg-gray-100'>
          <AiOutlineSearch size={18} className='text-gray-700' />
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder='Ara...'
            className={`placeholder:text-gray-700 bg-gray-50 w-full p-2 outline-none `}
          />
        </div>
        {categories?.map((category) => (
          <li
            key={category?.name}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
${
  category?.name?.toLowerCase() === selected?.name?.toLowerCase() &&
  'bg-sky-600 text-white'
}
${category?.name?.toLowerCase().includes(inputValue) ? 'block' : 'hidden'}`}
            onClick={() => {
              if (
                category?.name?.toLowerCase() !== selected?.name?.toLowerCase()
              ) {
                setSelected(category);
                setOpen(false);
                setInputValue('');
              }
            }}
          >
            {category?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductTrendyolEditModalCategoriesSelect;
