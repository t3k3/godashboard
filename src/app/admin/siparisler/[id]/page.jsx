import OrderComp from '@/components/admin/OrderComp';
import { getSingleOrder } from '@/services/order';
import { cookies } from 'next/headers';

async function Siparis(props) {
  const nextCookies = cookies();
  const order = await getSingleOrder(nextCookies, props.params.id);

  return (
    order && (
      <OrderComp order={order.order} order_statuses={order.order_statuses} />
    )
  );
}

export default Siparis;
