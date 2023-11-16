import CustomerList from '@/components/admin/Customers/CustomerList';
import { getCustomers } from '@/services/customer';
import { cookies } from 'next/headers';

async function Liste() {
  const nextCookies = cookies();
  const customers = await getCustomers(nextCookies);

  return customers && <CustomerList customers={customers.customers} />;
}

export default Liste;
