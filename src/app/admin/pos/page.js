import POSPage from '@/components/admin/Pos';
import { getPaymentMethods } from '@/services/payment';
import { cookies } from 'next/headers';

async function Pos() {
  const nextCookies = cookies();
  // const paymentMethods = await getPaymentMethods(nextCookies);

  return <POSPage />;
  // return (
  //   paymentMethods && (
  //     <PaymentMethodList paymentMethods={paymentMethods.extensions} />
  //   )
  // );
}

export default Pos;
