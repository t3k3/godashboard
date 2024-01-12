import React from 'react';
import Breadcrums from '@/components/store/Breadcrums';
import ProductListWrapper from '@/components/store/ProductList/ProductListWrapper';
import ProductWrapper from '@/components/store/Home/ProductWrapper';
import { getCategoryProductsBySeoUrl } from '@/services/store/category';

export const generateMetadata = async ({ params }) => {
  const { heading_title } = await getCategoryProductsBySeoUrl(params.kategori);
  return {
    title: `${heading_title}`,
  };
};

async function Kategori(props) {
  const response = await getCategoryProductsBySeoUrl(props.params.kategori);

  console.log('response12323233123: ', response);

  return (
    <div>
      {/* <Breadcrums breadcrumbs={categoryProduct.breadcrumbs} /> */}
      {/* <ProductListWrapper categoryProduct={categoryProduct} /> */}

      {response.status === 200 ? (
        <ProductWrapper wrapperName={''} products={response.products} />
      ) : (
        <ProductWrapper wrapperName={''} products={[]} />
      )}
    </div>
  );
}

export default Kategori;
