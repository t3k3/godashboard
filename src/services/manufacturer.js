import { _API_URL_ADMIN } from '@/config/apiConfig';

const getManufacturerService = async (nextCookies, id = '') => {
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
    const res = await fetch(`${_API_URL_ADMIN}/manufacturers`, requestOptions);

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getSingleManufacturer = async (id) => {
  return getManufacturerService(
    `catalog/manufacturer/edit&manufacturer_id=${id}`
  );
};

const getManufacturers = async (nextCookies) => {
  return getManufacturerService(nextCookies);
};

export { getManufacturerService, getSingleManufacturer, getManufacturers };
