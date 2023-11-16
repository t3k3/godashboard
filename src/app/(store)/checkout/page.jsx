import CheckoutPage from '@/components/store/Checkout';
import { cookies } from 'next/headers';
import isLoggedStore from '@/app/libs/isLoggedStore';
import LoginRegister from '@/components/store/LoginRegister';
// import { getCart } from '@/services/store/cart';
import getClientHeaders from '@/app/libs/getHeaders';
import { getCheckout } from '@/services/store/checkout';
import { redirect } from 'next/navigation';
import { saveShippingMethod } from '@/services/store/checkout';

async function Checkout({ searchParams }) {
  const cookiesX = await getClientHeaders();

  const cartTemp = await getCheckout(cookiesX);

  const nextCookies = cookies();

  const isLogged = await isLoggedStore(nextCookies);

  if (cartTemp.status == 404) {
    console.log('getCheckout 404 dondu');
    redirect('/sepet');
  }

  if (cartTemp.status == 500) {
    console.log('status: ', cartTemp.status);
    return 'Sepet alınamadı. Sunucu hatası: ', cartTemp.status;
  }

  if (cartTemp.shipping_methods.length > 0) {
    const response = await saveShippingMethod(
      cartTemp.shipping_methods[0].code
    );
  } else {
    console.log('Kargo metodu bulunamadı');
    return 'Kargo metodu bulunamadı';
  }

  const cart = await getCheckout(cookiesX);

  // console.log('CART: ', cart);

  if (isLogged) {
    return (
      <CheckoutPage
        cart={cart}
        shipping_methods={cart.shipping_methods}
        isLogged={isLogged}
      />
    );
  } else if (searchParams.account == 0) {
    return (
      <CheckoutPage
        cart={cart}
        shipping_methods={cart.shipping_methods}
        isLogged={isLogged}
      />
    );
  } else {
    return <LoginRegister />;
  }
}

export default Checkout;
