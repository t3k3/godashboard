import OrderComp from '@/components/admin/OrderComp';
import { getSingleOrder } from '@/services/order';
import { cookies } from 'next/headers';

async function Siparis(props) {
  const nextCookies = cookies();
  const order = await getSingleOrder(nextCookies, props.params.id);

  if (order.order.order_id == 0) {
    return 'Sipariş bulunamadı';
  } else {
    return order && <OrderComp order={order.order} />;
  }
}

export default Siparis;
