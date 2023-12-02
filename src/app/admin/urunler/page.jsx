import ProductList from '@/components/admin/ProductList';
import { getProducts } from '@/services/product';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Ürünler',
};

async function Products() {
  const nextCookies = cookies();
  const { products } = await getProducts(nextCookies);

  return (
    products && (
      <ProductList
        products={products}
        // totalProducts={products.totalProducts}
      />
    )
  );
}

export default Products;
