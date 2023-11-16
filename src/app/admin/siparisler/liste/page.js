import OrderList from '@/components/admin/Orders/OrderList';
import { getOrders } from '@/services/order';
import { cookies } from 'next/headers';

async function Liste() {
  const nextCookies = cookies();
  const orders = await getOrders(nextCookies);

  return (
    orders && (
      <OrderList orders={orders.orders} order_total={orders.order_total} />
    )
  );
}

export default Liste;
