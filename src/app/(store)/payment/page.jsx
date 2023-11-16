import { cookies } from 'next/headers';
import isLoggedStore from '@/app/libs/isLoggedStore';
import LoginRegister from '@/components/store/LoginRegister';
import getClientHeaders from '@/app/libs/getHeaders';
import { getCheckout } from '@/services/store/checkout';
import { redirect } from 'next/navigation';
import PaymentPage from '@/components/store/Payment';

async function Payment({ searchParams }) {
  const cookiesX = await getClientHeaders();
  const cart = await getCheckout(cookiesX);
  const nextCookies = cookies();

  const isLogged = await isLoggedStore(nextCookies);

  if (cart.status == 404) {
    console.log('getCheckout 404 dondu');
    redirect('/sepet');
  }

  // if (cart.error) {
  //   console.log('getCheckout 404 dondu');
  //   redirect('/sepet');
  // }

  if (isLogged) {
    return <PaymentPage cart={cart} payment_methods={cart.payment_methods} />;
  } else if (searchParams.account == 0) {
    return <PaymentPage cart={cart} payment_methods={cart.payment_methods} />;
  } else {
    return <LoginRegister />;
  }
}

export default Payment;
