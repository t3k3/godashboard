import Breadcrums from '@/components/store/Breadcrums';
import CartPage from '@/components/store/Cart/CartPage';
import { getCart } from '@/services/store/cart';
import getClientHeaders from '@/app/libs/getHeaders';
import { getNewProductList } from '@/services/store/product';

async function Sepet() {
  const cookies = await getClientHeaders();
  const cart = await getCart(cookies);
  const { products } = await getNewProductList();

  return (
    <>
      <Breadcrums
        breadcrumbs={[
          { text: 'Ana sayfa', href: '/' },
          { text: 'Sepet', href: '/sepet' },
        ]}
      />
      <CartPage cart={cart} products={products} />
    </>
  );
}

export default Sepet;
