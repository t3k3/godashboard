import PaymentMethodList from '@/components/admin/PaymentMethods/PaymentMethodList';
import { getPaymentMethods } from '@/services/payment';

async function Accounting() {
  //const accountingMethods = await getAccountingMethods();

  return 'Accounting';
  // accountingMethods && (
  //   <AccountingMethodList
  //     accountingMethods={accountingMethods.extensions}
  //     //manufacturer_total={shippingMethods.manufacturer_total}
  //   />
  // )
}

export default Accounting;
