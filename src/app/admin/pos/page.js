import POSPage from '@/components/admin/Pos';
import { getFilteredProducts, getProducts } from '@/services/product';
import { cookies } from 'next/headers';

async function Pos() {
  const nextCookies = cookies();
  // const paymentMethods = await getPaymentMethods(nextCookies);

  const { products } = await getFilteredProducts({
    name: 'barcode',
    value: 'fill',
  });

  return <POSPage products={products} />;
  // return (
  //   paymentMethods && (
  //     <PaymentMethodList paymentMethods={paymentMethods.extensions} />
  //   )
  // );
}

export default Pos;
