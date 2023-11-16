import ShippingMethodList from '@/components/admin/ShippingMethods/ShippingMethodList';
import { getShippingMethods } from '@/services/shipping';
import { cookies } from 'next/headers';

async function Shipping() {
  const nextCookies = cookies();
  const shippingMethods = await getShippingMethods(nextCookies);

  return (
    shippingMethods && (
      <ShippingMethodList
        shippingMethods={shippingMethods.extensions}
        //manufacturer_total={shippingMethods.manufacturer_total}
      />
    )
  );
}

export default Shipping;
