import { getSingleCategory } from '@/services/category';
import CategoryComp from '@/components/admin/CategoryComp';
import { cookies } from 'next/headers';

async function Kategori(props) {
  const nextCookies = cookies();
  const { category } = await getSingleCategory(nextCookies, props.params.id);

  return category && <CategoryComp category={category} />;
}

export default Kategori;
