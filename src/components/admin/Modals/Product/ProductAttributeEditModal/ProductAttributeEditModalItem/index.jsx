import React, { useState } from 'react';

function ProductAttributeEditModalItem(props) {
  const [attribute, setAttribute] = useState(props.attribute);

  const handleChangeAttr = (e) => {
    setAttribute((prev) => {
      return {
        ...prev,
        product_attribute_description: {
          [5]: { text: e.target.value },
        },
      };
    });

    props.handleChangeText(e, attribute.attribute_id);
  };

  return (
    <div key={attribute.attribute_id} className='my-4 flex justify-between'>
      <span className='bg-green-100 text-green-800 text-lg font-medium mr-2 px-2.5 py-2 rounded w-40 '>
        {attribute.name}
      </span>
      <input
        type='text'
        name={attribute.name}
        value={
          attribute?.product_attribute_description !== undefined &&
          attribute?.product_attribute_description[5]?.text !== ''
            ? attribute?.product_attribute_description[5]?.text
            : ''
        }
        onChange={handleChangeAttr}
        className='border text-gray-700 text-lg font-medium mr-2  px-2.5 py-2 w-full rounded'
      />
      <span
        className='text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-900 font-medium rounded-lg text-sm px-5 py-2.5 my-1 text-center mr-2 mb-2 cursor-pointer'
        onClick={() => {
          props.editProductAttribute(attribute.attribute_id);
        }}
      >
        Sil
      </span>
    </div>
  );
}

export default ProductAttributeEditModalItem;
