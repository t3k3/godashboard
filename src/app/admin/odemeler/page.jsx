import PaymentMethodList from '@/components/admin/PaymentMethods/PaymentMethodList';
import { getPaymentMethods } from '@/services/payment';
import { cookies } from 'next/headers';

async function Payment() {
  const nextCookies = cookies();
  // const paymentMethods = await getPaymentMethods(nextCookies);

  return 'Ödemeler';
  // return (
  //   paymentMethods && (
  //     <PaymentMethodList paymentMethods={paymentMethods.extensions} />
  //   )
  // );
}

export default Payment;
