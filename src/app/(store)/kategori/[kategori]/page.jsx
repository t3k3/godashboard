import React from 'react';
import Breadcrums from '@/components/store/Breadcrums';
import ProductListWrapper from '@/components/store/ProductList/ProductListWrapper';
import { getCategoryProductsBySeoUrl } from '@/services/store/category';

export const generateMetadata = async ({ params }) => {
  const { heading_title } = await getCategoryProductsBySeoUrl(params.kategori);
  return {
    title: `${heading_title}`,
  };
};

async function Kategori(props) {
  const categoryProduct = await getCategoryProductsBySeoUrl(
    props.params.kategori
  );

  // console.log('categoryProduct: ', categoryProduct);

  return (
    <div>
      <Breadcrums breadcrumbs={categoryProduct.breadcrumbs} />
      <ProductListWrapper categoryProduct={categoryProduct} />
    </div>
  );
}

export default Kategori;
