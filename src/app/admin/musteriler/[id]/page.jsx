import CustomerComp from '@/components/admin/CustomerComp';
import {
  getCustomerOrderHistory,
  getSingleCustomer,
} from '@/services/customer';
import { cookies } from 'next/headers';

async function Musteri(props) {
  const nextCookies = cookies();

  const customer = await getSingleCustomer(nextCookies, props.params.id);
  // const customerOrderHistory = await getCustomerOrderHistory(
  //   nextCookies,
  //   props.params.id
  // );

  // console.log('customerOrderHistory: ', customerOrderHistory.customerOrders);

  return (
    customer && (
      <CustomerComp
        customer={customer}

        // customerOrderHistory={customerOrderHistory.customerOrders}
      />
    )
  );
}

export default Musteri;
