import isLoggedCustomer from '@/app/libs/isLoggedCustomer';
import LoginRegister from '@/components/store/LoginRegister';
import getClientHeaders from '@/app/libs/getHeaders';
import { getCheckout } from '@/services/store/checkout';
import { redirect } from 'next/navigation';
import PaymentPage from '@/components/store/Payment';
import { getPayment } from '@/services/store/payment';

async function Payment({ searchParams }) {
  const cookies = await getClientHeaders();

  if (!(searchParams.orderid > 0)) {
    redirect('/sepet');
  }

  console.log('searchParams: ', searchParams.orderid);

  const { payment } = await getPayment(cookies, searchParams.orderid);
  const isLogged = await isLoggedCustomer(cookies);

  if (payment == undefined) {
    redirect('/sepet');
  }
  console.log('payment2423423: ', payment);
  // if (cart.status == 404) {
  //   console.log('getCheckout 404 dondu');
  //   redirect('/sepet');
  // }

  // if (cart.error) {
  //   console.log('getCheckout 404 dondu');
  //   redirect('/sepet');
  // }

  if (isLogged) {
    return (
      <PaymentPage
        payment={payment}
        // payment_methods={payment.payment_methods}
        cookies={cookies}
      />
    );
  } else if (searchParams.account == 0) {
    return (
      <PaymentPage
        payment={payment}
        // payment_methods={payment.payment_methods}
        cookies={cookies}
      />
    );
  } else {
    return <LoginRegister />;
  }
}

export default Payment;
