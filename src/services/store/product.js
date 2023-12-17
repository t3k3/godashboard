import {
  API_URL_STORE,
  API_URL_STORE_WO_ROUTE,
  _API_URL_STORE,
} from '@/config/apiConfig';

const getProductService = async (pathname = '', query = '') => {
  try {
    const res = await fetch(`${_API_URL_STORE}/products`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const getProductServiceBySeo = async (pathname, query = '') => {
  const res = await fetch(`${_API_URL_STORE}/products/${pathname}`, {
    cache: 'no-store',
  });

  if (res.status == 500) {
    console.log('SUNCUYLA İLETİŞİM KURULAMADI.');
  }

  return res.json();
};

// const getSingleAttribute = async (id) => {
//   return getAttributeService(`catalog/category/edit&category_id=${id}`);
// };

const getNewProductList = async () => {
  return getProductService();
};

const getProductDetail = async (id) => {
  return getProductService(`product/product&product_id=${id}`);
};

const getProductDetailBySlug = async (seo_url) => {
  return getProductServiceBySeo(seo_url);
};

export {
  getProductService,
  getNewProductList,
  getProductDetail,
  getProductDetailBySlug,
};
