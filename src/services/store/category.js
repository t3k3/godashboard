import {
  API_URL_STORE,
  API_URL_STORE_WO_ROUTE,
  _BASE_URL,
} from '@/config/apiConfig';

const getCategoryService = async (pathname, query = '') => {
  try {
    const res = await fetch(`${API_URL_STORE}/${pathname}`, {
      cache: 'no-store',
    });
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
};

const getCategoryServiceBySeo = async (keyword, query = '') => {
  const res = await fetch(`${_BASE_URL}/api/category?keyword=${keyword}`, {
    cache: 'no-store',
  });

  return res.json();
};

// const getSingleAttribute = async (id) => {
//   return getAttributeService(`catalog/category/edit&category_id=${id}`);
// };

const getAllCategoryList = async () => {
  return getCategoryService('product/category/tumkategoriler');
};

const getNewCategoryList = async () => {
  return getCategoryService('category/ategory/yeniurunler');
};

const getCategoryProductsBySeoUrl = async (seo_url) => {
  return getCategoryServiceBySeo(seo_url);
};

const getCategoryDetail = async (id) => {
  return getCategoryService(`category/category&category_id=${id}`);
};

const getCategoryDetailBySeoUrl = async (seo_url) => {
  return getCategoryServiceBySeo(seo_url);
};

export {
  getCategoryService,
  getAllCategoryList,
  getNewCategoryList,
  getCategoryProductsBySeoUrl,
  getCategoryDetail,
  getCategoryDetailBySeoUrl,
};
