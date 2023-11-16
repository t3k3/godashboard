import React from 'react';

import Breadcrums from '@/components/store/Breadcrums';
import ProductDetail from '@/components/store/ProductDetail';
import {
  getProductDetail,
  getProductDetailBySeoUrl,
} from '@/services/store/product';

// export const generateMetadata = async ({ params }) => {
//   const { meta_title } = await getProductDetail(params.urun);
//   return {
//     title: `${meta_title}`,
//   };
// };

export const generateMetadata = async ({ params }) => {
  const { name } = await getProductDetailBySeoUrl(params.urun);

  return {
    title: `${name}`,
  };
};

async function Urun(props) {
  // const product = await getProductDetail(props.params.urun);

  const product = await getProductDetailBySeoUrl(props.params.urun);

  // console.log('product4534: ', product);

  if (product?.error) {
    return 'Ürün Bulanamadı';
  }

  return (
    <div className='bg-gray-50'>
      <Breadcrums breadcrumbs={product.breadcrumbs} />
      <ProductDetail product={product} />
    </div>
  );
}

export default Urun;
