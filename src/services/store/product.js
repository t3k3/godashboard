import { API_URL_STORE, API_URL_STORE_WO_ROUTE } from '@/config/apiConfig';

const getProductService = async (pathname, query = '') => {
  try {
    const res = await fetch(`${API_URL_STORE}/${pathname}`, {
      cache: 'no-store',
    });

    return res.json();
  } catch (error) {
    throw new Error(error);
  }
};

const getProductServiceBySeo = async (pathname, query = '') => {
  const res = await fetch(`${API_URL_STORE_WO_ROUTE}/${pathname}`, {
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
  return getProductService('product/product/yeniurunler');
};

const getProductDetail = async (id) => {
  return getProductService(`product/product&product_id=${id}`);
};

const getProductDetailBySeoUrl = async (seo_url) => {
  return getProductServiceBySeo(seo_url);
};

export {
  getProductService,
  getNewProductList,
  getProductDetail,
  getProductDetailBySeoUrl,
};
