import { BASE_URL } from '@/config/apiConfig';

const getShippingService = async (nextCookies, id = '') => {
  let headers = new Headers();
  headers.append('Cookie', `default=${nextCookies.get('default').value}`);
  headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
  headers.append('Cookie', `language=${nextCookies.get('language').value}`);
  headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);
  headers.append('Cookie', `token=${nextCookies.get('token').value}`);

  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  try {
    const res = await fetch(`${BASE_URL}/api/admin/shippings`, requestOptions);

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getSingleShippingService = async (name) => {
  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    // headers: headers,
    redirect: 'follow',
  };

  try {
    const res = await fetch(
      // `${BASE_URL}/extension/shipping/${name}`,
      `${BASE_URL}/api/admin/shippings/${name}`,
      requestOptions
    );

    const response = await res.json();

    return response.shipping;
  } catch (error) {
    throw new Error(error);
  }
};

const putShippingService = async (data, name) => {
  const res = await fetch(`/api/admin/shippings/${name}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    console.log('ERROR: shippings.js service');
    throw new Error(error);
  }

  const resData = await res.json();

  return resData;
};

const getSingleShippingMethod = async (name) => {
  return getSingleShippingService(name);
};

const getShippingMethods = async (nextCookies) => {
  return getShippingService(nextCookies);
};

const editShipping = async (data, name) => {
  return putShippingService(data, name);
};

export {
  getShippingService,
  getSingleShippingMethod,
  getShippingMethods,
  editShipping,
};
