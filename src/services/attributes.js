import { API_URL_ADMIN } from '@/config/apiConfig';
import { BASE_URL } from '@/config/apiConfig';

const getAttributeService = async (pathname, query = '') => {
  try {
    const res = await fetch(`${API_URL_ADMIN}/${pathname}`, {
      cache: 'no-store',
    });
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
};

const getAttributeFromClientSideService = async () => {
  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const res = await fetch(
      `${BASE_URL}/api/admin/attributes/getAttributesFromClientSide`,
      requestOptions
    );

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getSingleAttribute = async (id) => {
  return getAttributeService(`catalog/category/edit&category_id=${id}`);
};

const getAttributes = async () => {
  return getAttributeService('catalog/attribute');
};

const getAttributesFromClientSide = async (nextCookies) => {
  return getAttributeFromClientSideService(nextCookies);
};

export {
  getAttributeService,
  getSingleAttribute,
  getAttributes,
  getAttributesFromClientSide,
};
