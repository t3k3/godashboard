import React from 'react';

import Breadcrums from '@/components/store/Breadcrums';
import ProductDetail from '@/components/store/ProductDetail';
import {
  getProductDetail,
  getProductDetailBySlug,
} from '@/services/store/product';

// export const generateMetadata = async ({ params }) => {
//   const { meta_title } = await getProductDetail(params.urun);
//   return {
//     title: `${meta_title}`,
//   };
// };

export const generateMetadata = async ({ params }) => {
  const { name } = await getProductDetailBySlug(params.urun);

  return {
    title: `${name}`,
  };
};

async function Urun(props) {
  // const product = await getProductDetail(props.params.urun);

  const product = await getProductDetailBySlug(props.params.urun);

  if (product?.error) {
    return 'Ürün Bulanamadı';
  }

  // console.log('product435345: ', product.product_combinations.options);
  // product_option_values için bir map oluştur
  const optionValuesMap = {};
  product.product_options.forEach((option) => {
    option.product_option_values.forEach((value) => {
      optionValuesMap[value.optionValueId] = {
        name: option.name,
        value: value.name,
      };
    });
  });

  // product_combinations için gerekli dönüşümü yap
  const updatedProductCombinations = product.product_combinations.map(
    (combination) => {
      const updatedOptions = combination.options.map((optionValueId) => {
        // optionValueId'ye karşılık gelen name ve value değerlerini bul
        return optionValuesMap[optionValueId];
      });

      return {
        ...combination,
        options: updatedOptions,
      };
    }
  );

  // Güncellenmiş ürün nesnesini oluştur
  const updatedProduct = {
    ...product,
    product_combinations: updatedProductCombinations,
  };

  // console.log('Güncellenmiş Ürün:', updatedProduct);

  return (
    <div className='bg-gray-50'>
      <Breadcrums breadcrumbs={product.breadcrumbs} />
      <ProductDetail product={updatedProduct} />
    </div>
  );
}

export default Urun;
