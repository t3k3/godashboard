import React, { useEffect, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import ProductTrendyolEditModalOption from '@/components/admin/Modals/Product/ProductTrendyolEditModal/ProductTrendyolEditModalOption';

const ProductTrendyolEditModalSelect = ({
  product,
  attribute,
  selectedCategory,
}) => {
  const [countries, setCountries] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);

  const [attributesValues, setAttributesValues] = useState([]);

  useEffect(() => {
    product && setSelected(product[attribute.attributeid]);
  }, []);
  //console.log(product[attribute.attributeid]);

  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=name')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  //   useEffect(() => {
  //     setSelected(product?.product_pazaryeri[1].ozellikler[attribute.id]);
  //     // console.log(
  //     //   'selected : ' + product.product_pazaryeri[1].ozellikler[attribute.id]
  //     // );
  //   }, []);

  const getAttributesValues = (id) => {
    console.log(
      'REQUEST: ',
      `http://havuz.actsistem.com/index.php?route=Ozelliklerdegerleri&pas=gs734jd&PazaryeriId=1&Attributeid=${id}&PKategoriId=${selectedCategory?.cid}`
    );
    fetch(
      `http://havuz.actsistem.com/index.php?route=Ozelliklerdegerleri&pas=gs734jd&PazaryeriId=1&Attributeid=${id}&PKategoriId=${selectedCategory?.cid}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAttributesValues(data);
        setOpen(!open);
      });
    //console.log('attributesValues : ', attributesValues);
  };

  function getClick(id) {
    return Promise.all([getAttributesValues(id)]).then(() => {
      //console.log(attributesValues);
    });
  }

  return (
    <div className='w-1/3 font-medium h-15'>
      <label
        className='block uppercase tracking-wide my-5 text-gray-700 text-xs font-bold mb-2'
        htmlFor='grid-zip'
      >
        {attribute?.name}
        {attribute?.required > 0 && '*'}
        {attribute?.allowcustom > 0 && 'custom'}
        {' ' + attribute?.attributeid}
      </label>

      <div
        onClick={() => {
          getClick(attribute?.attributeid);
        }}
        className={`bg-gray-200 border ${
          attribute?.required > 0 && 'border-red-500'
        } w-full shadow p-2 flex items-center justify-between rounded ${
          !selected && 'text-gray-700'
        }`}
      >
        {/* {selected
          ? selected?name.length > 25
            ? selected?.substring(0, 25) + '...'
            : selected
          : 'Select Country'} */}

        {selected ? selected.name : 'Değer Seçiniz...'}

        <BiChevronDown size={20} className={`${open && 'rotate-180'}`} />
      </div>
      <ul
        className={` bg-gray-200 mt-2 overflow-y-auto fixed w-200 ${
          open ? 'max-h-60 relative' : 'max-h-0'
        } `}
      >
        <div className='flex items-center px-2 top-0 bg-gray-100'>
          <AiOutlineSearch size={18} className='text-gray-700' />
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder='Ara...'
            className={`placeholder:text-gray-700 bg-gray-50 p-2 outline-none `}
          />
        </div>
        {attributesValues?.map((value) => (
          <li
            key={value?.name}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
          ${
            value?.name?.toLowerCase() === selected?.name?.toLowerCase() &&
            'bg-sky-600 text-white'
          }
          ${
            value?.name?.toLowerCase().startsWith(inputValue)
              ? 'block'
              : 'hidden'
          }`}
            onClick={() => {
              if (
                value?.name?.toLowerCase() !== selected?.name?.toLowerCase()
              ) {
                setSelected(value);
                setOpen(false);
                setInputValue('');
              }
            }}
          >
            {value?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductTrendyolEditModalSelect;
