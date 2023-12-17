import { _API_URL_ADMIN, _BASE_URL } from '@/config/apiConfig';

const getOrderStatusesService = async (nextCookies, id = '') => {
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
      `${_BASE_URL}/api/admin/orderstatuses/${id}`,
      requestOptions
    );

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const putOrderStatusesService = async (data, id) => {
  const res = await fetch(`${_BASE_URL}/api/admin/orderstatuses/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    console.log('ERROR: orderstatuses.js service');
    throw new Error(error);
  }

  const resData = await res.json();

  return resData;
};

// const getSingleOrderStatusService = async (id) => {
//   return getOrderStatusesService(
//     `catalog/manufacturer/edit&manufacturer_id=${id}`
//   );
// };

const postOrderStatusesService = async (data) => {
  const res = await fetch(`${_BASE_URL}/api/admin/orderstatuses`, {
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

const DeleteOrderStatusesService = async (id) => {
  const res = await fetch(`${_BASE_URL}/api/admin/orderstatuses/${id}`, {
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

const getOrderStatuses = async (nextCookies) => {
  return getOrderStatusesService(nextCookies);
};

const editOrderStatuses = async (data, id) => {
  return putOrderStatusesService(data, id);
};

const addNewOrderStatus = async (data) => {
  return postOrderStatusesService(data);
};

const DeleteOrderStatus = async (id) => {
  return DeleteOrderStatusesService(id);
};

export {
  getOrderStatusesService,
  // getSingleOrderStatus,
  getOrderStatuses,
  editOrderStatuses,
  addNewOrderStatus,
  DeleteOrderStatus,
};
