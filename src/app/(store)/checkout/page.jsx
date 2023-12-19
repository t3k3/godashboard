import CheckoutPage from '@/components/store/Checkout';
import { cookies } from 'next/headers';
import isLoggedCustomer from '@/app/libs/isLoggedCustomer';
import LoginRegister from '@/components/store/LoginRegister';
// import { getCart } from '@/services/store/cart';
import getClientHeaders from '@/app/libs/getHeaders';
import { getCheckout } from '@/services/store/checkout';
import { redirect } from 'next/navigation';
import { saveShippingMethod } from '@/services/store/checkout';

async function Checkout({ searchParams }) {
  const cookies = await getClientHeaders();

  const { checkout } = await getCheckout(cookies);

  if (checkout.cart.cart_items.length == 0) {
    redirect('/sepet');
  }

  const isLogged = await isLoggedCustomer(cookies);

  // if (checkout.cart.cart_items.length > 0) {
  //   const response = await saveShippingMethod(checkout.shipping_option[0].ID);
  // } else {
  //   console.log('Kargo metodu bulunamadı');
  //   return 'Kargo metodu bulunamadı';
  // }

  // console.log('CHECKOUT 43243: ', checkout);

  if (isLogged > 0) {
    return (
      <CheckoutPage
        cart={checkout.cart}
        shipping_options={checkout.shipping_option}
        isLogged={isLogged}
        cookies={cookies}
      />
    );
  } else if (searchParams.account == 0) {
    return (
      <CheckoutPage
        cart={checkout.cart}
        shipping_options={checkout.shipping_option}
        isLogged={isLogged}
        cookies={cookies}
      />
    );
  } else {
    return <LoginRegister />;
  }
}

export default Checkout;
