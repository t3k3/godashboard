import React from 'react';
import ProductListFilter from './ProductListFilter';
import ProductListArea from './ProductListArea';

function ProductListWrapper({ categoryProduct }) {
  return (
    <div className='container sm:grid grid-cols-4 gap-6 pt-4 pb-16 items-start'>
      <ProductListFilter categories={categoryProduct.categories} />
      <ProductListArea products={categoryProduct.products} />
    </div>
  );
}

export default ProductListWrapper;
