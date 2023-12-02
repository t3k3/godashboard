import { BASE_URL } from '@/config/apiConfig';
import { _BASE_URL } from '@/config/apiConfig';
import { _API_URL_ADMIN } from '@/config/apiConfig';

const getProductService = async (nextCookies, id = '') => {
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
      `${_BASE_URL}/api/admin/products/${id}`,
      requestOptions
    );

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getProductOrderHistoryService = async (id) => {
  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    redirect: 'follow',
  };
  try {
    const res = await fetch(
      `${BASE_URL}/api/admin/products/productOrders/${id}`,
      requestOptions
    );

    const response = await res.json();
    // console.log('response: ', response.orders);

    return response.orders;
  } catch (error) {
    throw new Error(error);
  }
};

const putProductService = async (data, id) => {
  const res = await fetch(`/api/admin/products/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    console.log('ERROR: product.js service');
    throw new Error(error);
  }

  const resData = await res.json();

  return resData;
};

const postProductService = async (data) => {
  const res = await fetch(`/api/admin/products`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    console.log('ERROR: product.js service');
    throw new Error(error);
  }

  const resData = await res.json();

  return resData;
};

const deleteProductService = async (data) => {
  const res = await fetch(`/api/admin/products`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    console.log('ERROR: product.js service');
    throw new Error(error);
  }

  const resData = await res.json();

  return resData;
};

const getFilteredProductService = async (filterObject) => {
  console.log('filterObject FROM Product Service: ', filterObject);
  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    redirect: 'follow',
  };
  try {
    const res = await fetch(
      `${BASE_URL}/api/admin/products/getFilteredProducts?name=${filterObject.name}&value=${filterObject.value}`,
      requestOptions
    );

    const response = await res.json();
    console.log('response: ', response);

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const ProductToCategoryService = async (data) => {
  const res = await fetch(`/api/admin/products/category`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    console.log('ERROR: product.js service');
    throw new Error(error);
  }

  const resData = await res.json();

  return resData;
};

const ProductToAttributeService = async (data) => {
  const res = await fetch(`/api/admin/products/attribute`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    console.log('ERROR: product.js service');
    throw new Error(error);
  }

  const resData = await res.json();

  return resData;
};

const getSingleProduct = async (nextCookies, id) => {
  return getProductService(nextCookies, id);
};

const getProductOrderHistory = async (id) => {
  return getProductOrderHistoryService(id);
};

const getProducts = async (nextCookies) => {
  return getProductService(nextCookies);
};

const getFilteredProducts = async (filterObject) => {
  return getFilteredProductService(filterObject);
};

const getTrendyolCategories = async () => {
  return getProductService('categories.json');
};

const editProduct = async (data, id) => {
  return putProductService(data, id);
};

const editProductStatus = async (data, id) => {
  return putProductService(data, id);
};

const addNewProduct = async (data) => {
  return postProductService(data);
};

const deleteProduct = async (data) => {
  return deleteProductService(data);
};

const UpdateProductCategories = async (data) => {
  return ProductToCategoryService(data);
};

const UpdateProductAttributes = async (data) => {
  return ProductToAttributeService(data);
};

export {
  getProductService,
  getSingleProduct,
  getProductOrderHistory,
  getProducts,
  getFilteredProducts,
  getTrendyolCategories,
  editProduct,
  editProductStatus,
  addNewProduct,
  deleteProduct,
  UpdateProductCategories,
  UpdateProductAttributes,
};
