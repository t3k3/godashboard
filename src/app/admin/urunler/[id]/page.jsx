import ProductComp from '@/components/admin/ProductComp';
import { getSingleProduct } from '@/services/product';
import { cookies } from 'next/headers';

async function Urun(props) {
  const nextCookies = cookies();
  var { product } = await getSingleProduct(nextCookies, props.params.id);

  return product && <ProductComp product={product} />;
}

export default Urun;
