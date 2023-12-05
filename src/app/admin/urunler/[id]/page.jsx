import ProductComp from '@/components/admin/ProductComp';
import { getSingleProduct } from '@/services/product';
import { getOptions } from '@/services/option';
import { cookies } from 'next/headers';

async function Urun(props) {
  const nextCookies = cookies();
  var { product } = await getSingleProduct(nextCookies, props.params.id);

  console.log(nextCookies);

  const { options } = await getOptions();

  return product && <ProductComp product={product} options={options} />;
}

export default Urun;
