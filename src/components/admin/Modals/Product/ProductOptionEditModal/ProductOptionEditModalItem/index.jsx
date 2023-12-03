import React, { useState } from 'react';

function ProductOptionEditModalItem(props) {
  const [productOption, setProductOption] = useState(props.productOption);

  const handleChangeNewOptionValue = (e) => {
    if (e.target.value !== '') {
      if (
        !productOption?.product_option_values?.some(
          (it) => it.optionValueId == e.target.value
        )
      ) {
        let x = {
          optionValueId: Number(e.target.value),
          productOptionId: productOption.ID,
        };

        setProductOption((prev) => {
          return {
            ...prev,
            ...prev.product_option_values.push(x),
          };
        });

        console.log(productOption);
      }
    }
    // props.createVariantsTest();
  };

  function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.optionValueId === id);

    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }

    return arr;
  }

  const editProductOption = (optionId, optionValueId) => {
    const sp = removeObjectWithId(
      productOption.product_option_values,
      optionValueId
    );
    setProductOption((prev) => {
      return {
        ...prev,
        product_option_values: sp,
      };
    });
    // props.createVariantsTest();
  };

  return (
    <div className='justify-between border rounded flex px-4 my-4 items-center '>
      <span className=' line-clamp-1'>
        <span className='float-left mr-4 py-3 font-medium text-base text-gray-600'>
          {props.options.find((opt) => opt.ID === productOption.optionId).name}
        </span>
        {productOption?.product_option_values?.map(
          (product_option_value, index) => {
            return (
              <div
                key={index}
                className='flex items-center float-left mr-2 py-2'
              >
                <span
                  className='bg-gray-100 py-1.5 hover:bg-red-500 hover:text-white cursor-pointer text-gray-600 text-sm font-medium px-2.5 rounded-md border border-gray-300 '
                  onClick={() =>
                    editProductOption(
                      productOption.optionId,
                      product_option_value.optionValueId
                    )
                  }
                >
                  {
                    props.options
                      .find((opt) => opt.ID === productOption.optionId)
                      .values.find(
                        (val) => val.ID == product_option_value.optionValueId
                      ).name
                  }
                </span>
              </div>
            );
          }
        ) || ''}
      </span>
      <div className='flex flex-wrap items-center'>
        <div className='w-full '>
          {/* <label
            htmlFor='countries'
            className='block mb-2 text-sm font-medium text-gray-900 '
          >
            Yeni
          </label> */}
          <select
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5'
            onChange={(e) => {
              handleChangeNewOptionValue(e);
            }}
          >
            <option defaultValue={true} value={''}>
              Seç
            </option>

            {props.options[
              props.options?.indexOf(
                props.options.find((opt) => opt.ID === productOption.optionId)
              )
            ]?.values?.map((value) => {
              return (
                <option key={value.ID} value={value.ID}>
                  {value.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}

export default ProductOptionEditModalItem;
