import CategoryList from '@/components/admin/Categories/CategoryList';
import { getCategories } from '@/services/category';
import { cookies } from 'next/headers';

async function Categories() {
  const nextCookies = cookies();
  const { categories } = await getCategories(nextCookies);

  return categories && <CategoryList categories={categories} />;
}

export default Categories;
