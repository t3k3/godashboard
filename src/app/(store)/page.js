import Banner from '@/components/store/Home/Banner';
import Feature from '@/components/store/Home/Feature';
import Categories from '@/components/store/Home/Categories';
import ProductWrapper from '@/components/store/Home/ProductWrapper';
import AdSection from '@/components/store/Home/AdSection';
import { getNewProductList } from '@/services/store/product';

export const metadata = {
  title: 'Store Ana Sayfa',
  description: 'Store Ana Sayfasi',
};

export default async function Home() {
  const products = await getNewProductList();
  // console.log('products: ', products);

  return (
    <main>
      <Banner />
      <Feature />
      <Categories />
      <ProductWrapper wrapperName={'Yeni çok satanlar'} products={products} />
      <AdSection />
    </main>
  );
}
