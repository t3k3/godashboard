import OrderStatusesList from '@/components/admin/OrderStatuses/OrderStatusesList';
import { getOrderStatuses } from '@/services/orderstatuses';
import { cookies } from 'next/headers';

async function Manufacturer() {
  const nextCookies = cookies();
  const { orderstatuses } = await getOrderStatuses(nextCookies);

  console.log('orderstatuses: ', orderstatuses);

  return (
    orderstatuses && (
      <OrderStatusesList
        orderstatuses={orderstatuses}
        // manufacturer_total={manufacturers.manufacturer_total}
      />
    )
  );
}

export default Manufacturer;
