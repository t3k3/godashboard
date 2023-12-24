import isLoggedCustomer from '@/app/libs/isLoggedCustomer';
import LoginRegister from '@/components/store/LoginRegister';
import getClientHeaders from '@/app/libs/getHeaders';
import { getCheckout } from '@/services/store/checkout';
import { redirect } from 'next/navigation';
import PaymentPage from '@/components/store/Payment';
import { getPayment } from '@/services/store/payment';

function hasDifferences(cart, order) {
  return cart.some((item1) => {
    const matchingItem = order.find(
      (item2) =>
        item1.product_id === item2.product_id &&
        item1.quantity === item2.quantity &&
        item1.option_id === item2.option_id
    );

    return !matchingItem; // Eşleşme yoksa true döner
  });
}

async function Payment({ searchParams }) {
  const cookies = await getClientHeaders();

  if (!(searchParams.orderid > 0)) {
    redirect('/sepet');
  }

  // console.log('searchParams: ', searchParams.orderid);

  const { checkout } = await getCheckout(cookies);

  const { payment } = await getPayment(cookies, searchParams.orderid);
  const isLogged = await isLoggedCustomer(cookies);

  if (payment == undefined) {
    redirect('/sepet');
  }
  // console.log('payment2423423: ', payment.order.order_products);
  // console.log('checkout2423423: ', checkout.cart.cart_items);
  // console.log(
  //   'hasDifferences  : ',
  //   hasDifferences(checkout.cart.cart_items, payment.order.order_products)
  // );

  //Sepetle sipariş arasında ürün farkı var mı kontrol edilir. Fark varsa checkout sayfasına yönlendirilir.
  if (hasDifferences(checkout.cart.cart_items, payment.order.order_products)) {
    redirect('/checkout');
  }

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
