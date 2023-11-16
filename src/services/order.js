import { BASE_URL } from '@/config/apiConfig';

const getOrderService = async (nextCookies, id = '') => {
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
    const res = await fetch(
      `${BASE_URL}/api/admin/orders/${id}`,
      requestOptions
    );

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getOrderHistoryService = async (id) => {
  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    redirect: 'follow',
  };
  try {
    const res = await fetch(
      `${BASE_URL}/api/admin/orders/orderHistory/${id}`,
      requestOptions
    );

    const response = await res.json();

    return response.histories;
  } catch (error) {
    throw new Error(error);
  }
};

const postOrderService = async (data, id) => {
  const res = await fetch(`/api/admin/orders/orderHistory/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    console.log('ERROR: order.js service');
    throw new Error(error);
  }

  const resData = await res.json();

  return resData;
};

const getSingleOrder = async (nextCookies, id) => {
  return getOrderService(nextCookies, id);
};

const getOrders = async (nextCookies) => {
  return getOrderService(nextCookies);
};

const getOrderHistory = async (id) => {
  return getOrderHistoryService(id);
};

const editOrderHistory = async (data, id) => {
  return postOrderService(data, id);
};

// const getOrderProducts = async (id) => {
//   return getOrderService(`catalog/product/OrderProducts&product_id=${id}`);
// };

const getCustomerOrders = async (nextCookies, id) => {
  return getOrderService(
    nextCookies,
    `customer/customer/orders&customer_id=${id}`
  );
};

export {
  getOrderService,
  getSingleOrder,
  getOrders,
  editOrderHistory,
  getOrderHistory,
  getCustomerOrders,
};

// import { API_URL_ADMIN } from '@/config/apiConfig';
// import { cookies } from 'next/headers';

// const getOrderService = async (pathname, query = '') => {
//   const nextCookies = cookies();
//   // console.log('token: ', nextCookies.get('token').value);

//   let headers = new Headers();

//   headers.append('Cookie', `default=${nextCookies.get('default').value}`);

//   headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
//   headers.append('Cookie', `language=${nextCookies.get('language').value}`);
//   headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);

//   try {
//     const res = await fetch(
//       `${API_URL_ADMIN}/${pathname}&token=${nextCookies.get('token').value}`,
//       {
//         cache: 'no-store',
//         headers: headers,
//       }
//     );
//     return res.json();
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const getSingleOrder = async (id) => {
//   return getOrderService(`sale/order/edit&order_id=${id}`);
// };

// const getOrders = async () => {
//   return getOrderService('sale/order');
// };

// const getHistory = async (id) => {
//   return getOrderService(`sale/order/history&order_id=${id}`);
// };
// const getOrderProducts = async (id) => {
//   return getOrderService(`catalog/product/OrderProducts&product_id=${id}`);
// };

// const getCustomerOrders = async (id) => {
//   return getOrderService(`customer/customer/orders&customer_id=${id}`);
// };

// export {
//   getOrderService,
//   getSingleOrder,
//   getOrders,
//   getHistory,
//   getOrderProducts,
//   getCustomerOrders,
// };
