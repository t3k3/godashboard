import { _API_URL_ADMIN, _BASE_URL } from '@/config/apiConfig';

const getCategoryService = async (nextCookies, id = '') => {
  let headers = new Headers();
  // headers.append('Cookie', `default=${nextCookies.get('default').value}`);
  // headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
  // headers.append('Cookie', `language=${nextCookies.get('language').value}`);
  // headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);
  // headers.append('Cookie', `token=${nextCookies.get('token').value}`);

  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  try {
    const res = await fetch(
      `${_BASE_URL}/api/admin/categories/${id}`,
      requestOptions
    );

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getCategoryFromClientSideService = async () => {
  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const res = await fetch(
      `${_API_URL_ADMIN}/api/admin/categories/getCategoriesFromClientSide`,
      requestOptions
    );

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const postCategoryService = async (data, id) => {
  console.log('EDİT CATEGORY');
  const res = await fetch(`/api/admin/categories/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    console.log('error');
    throw new Error(error);
  }

  const resData = await res.json();

  return resData;
};

const getSingleCategory = async (nextCookies, id) => {
  return getCategoryService(nextCookies, id);
};

const getCategories = async (nextCookies) => {
  return getCategoryService(nextCookies);
};

const getCategoriesFromClientSide = async (nextCookies) => {
  return getCategoryFromClientSideService(nextCookies);
};

const getCategoryProducts = async (id) => {
  return getCategoryService(`catalog/category/products&category_id=${id}`);
};

const editCategory = async (data, id) => {
  console.log('2 editCategory');
  return postCategoryService(data, id);
};

// const addNewCategory = async (data) => {
//   return postCategoryService(data);
// };

export {
  getCategoryService,
  getSingleCategory,
  getCategories,
  getCategoryProducts,
  editCategory,
  getCategoriesFromClientSide,
  // postCategoryService,
  // addNewCategory,
};
