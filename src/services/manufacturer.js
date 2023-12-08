import { _API_URL_ADMIN, _BASE_URL } from '@/config/apiConfig';

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
    const res = await fetch(
      `${_BASE_URL}/api/admin/manufacturers`,
      requestOptions
    );

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const putManufacturerService = async (data, id) => {
  const res = await fetch(`${_BASE_URL}/api/admin/manufacturers/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    console.log('ERROR: manufacturers.js service');
    throw new Error(error);
  }

  const resData = await res.json();

  return resData;
};

const getSingleManufacturer = async (id) => {
  return getManufacturerService(
    `catalog/manufacturer/edit&manufacturer_id=${id}`
  );
};

const postManufacturerService = async (data) => {
  const res = await fetch(`${_BASE_URL}/api/admin/manufacturers`, {
    method: 'POST',
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

const DeleteManufacturerService = async (id) => {
  const res = await fetch(`${_BASE_URL}/api/admin/manufacturers/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const error = await res.text();
    console.log('error');
    throw new Error(error);
  }

  const resData = await res.json();

  return resData;
};

const getManufacturers = async (nextCookies) => {
  return getManufacturerService(nextCookies);
};

const editManufacturer = async (data, id) => {
  return putManufacturerService(data, id);
};

const addNewManufacturer = async (data) => {
  return postManufacturerService(data);
};

const DeleteManufacturer = async (id) => {
  return DeleteManufacturerService(id);
};

export {
  getManufacturerService,
  getSingleManufacturer,
  getManufacturers,
  editManufacturer,
  addNewManufacturer,
  DeleteManufacturer,
};
