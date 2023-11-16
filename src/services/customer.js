import { BASE_URL } from '@/config/apiConfig';

const getCustomerService = async (nextCookies, id = '') => {
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
      `${BASE_URL}/api/admin/customers/${id}`,
      requestOptions
    );

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getCustomerOrdersService = async (id) => {
  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    // headers: headers,
    redirect: 'follow',
  };

  try {
    const res = await fetch(
      `${BASE_URL}/api/admin/customers/customerOrders/${id}`,
      requestOptions
    );

    const response = await res.json();

    return response.orders;
  } catch (error) {
    throw new Error(error);
  }
};

const postCustomerService = async (data, id) => {
  const res = await fetch(`/api/admin/customers/${id}`, {
    method: 'PUT',
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

const getSingleCustomer = async (nextCookies, id) => {
  return getCustomerService(nextCookies, id);
};

const getCustomers = async (nextCookies) => {
  return getCustomerService(nextCookies);
};

const getCustomerOrderHistory = async (id) => {
  return getCustomerOrdersService(id);
};

const editCustomer = async (data, id) => {
  return postCustomerService(data, id);
};

export {
  getCustomerService,
  getSingleCustomer,
  getCustomers,
  getCustomerOrderHistory,
  editCustomer,
};

// import { API_URL_ADMIN } from '@/config/apiConfig';
// import { cookies } from 'next/headers';

// const getCustomerService = async (pathname, query = '') => {
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

// const getSingleCustomer = async (id) => {
//   return getCustomerService(`customer/customer/edit&customer_id=${id}`);
// };

// const getCustomers = async () => {
//   return getCustomerService('customer/customer');
// };

// const getCustomerOrderHistory = async (id) => {
//   return getCustomerService(`customer/customer/orders&customer_id==${id}`);
// };

// export {
//   getCustomerService,
//   getSingleCustomer,
//   getCustomers,
//   getCustomerOrderHistory,
// };
