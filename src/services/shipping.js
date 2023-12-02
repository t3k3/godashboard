import { BASE_URL, _API_URL_ADMIN } from '@/config/apiConfig';

const getShippingService = async (nextCookies, id = '') => {
  // headers.append('Cookie', `default=${nextCookies.get('default').value}`);
  // headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
  // headers.append('Cookie', `language=${nextCookies.get('language').value}`);
  // headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);
  // headers.append('Cookie', `token=${nextCookies.get('token').value}`);

  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const res = await fetch(`${_API_URL_ADMIN}/shippings`, requestOptions);

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getSingleShippingService = async (id) => {
  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    // headers: headers,
    mode: 'no-cors',
    redirect: 'follow',
  };

  console.log('ID: ', id);

  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/shippings/${id}`,
      // `${_API_URL_ADMIN}/shippings/${id}`,
      requestOptions
    );

    const response = await res.json();

    return response.shipping;
  } catch (error) {
    console.log('error3453');
    throw new Error(error);
  }
};

const putShippingService = async (data, name) => {
  const res = await fetch(`/shippings/${name}`, {
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

const getSingleShippingMethod = async (id) => {
  return getSingleShippingService(id);
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
