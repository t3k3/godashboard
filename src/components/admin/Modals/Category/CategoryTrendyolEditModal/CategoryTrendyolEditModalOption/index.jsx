// import React from 'react';

// function ProductTrendyolEditModal({ value, attribute }) {
//   console.log('value: ' + JSON.stringify(value));
//   console.log('attribute: ' + JSON.stringify(attribute));
//   return <option value={attribute.name}>{value.name}</option>;
// }

// export default ProductTrendyolEditModal;

import React, { useState } from 'react';

function CategoryTrendyolEditModalOption({ value, attribute, country }) {
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);

  //   console.log('value: ' + JSON.stringify(value));
  //   console.log('attribute: ' + JSON.stringify(attribute));
  return (
    <li
      key={country?.name}
      className={`p-2 text-sm hover:bg-sky-600 hover:text-white
          ${
            country?.name?.toLowerCase() === selected?.toLowerCase() &&
            'bg-sky-600 text-white'
          }
          ${
            country?.name?.toLowerCase().startsWith(inputValue)
              ? 'block'
              : 'hidden'
          }`}
      onClick={() => {
        if (country?.name?.toLowerCase() !== selected.toLowerCase()) {
          setSelected(country?.name);
          setOpen(false);
          setInputValue('');
        }
      }}
    >
      {country?.name}
    </li>
  );
}

export default CategoryTrendyolEditModalOption;
