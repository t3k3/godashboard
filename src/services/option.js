import { BASE_URL } from '@/config/apiConfig';

const getOptionService = async (nextCookies, id = '') => {
  console.log('getOptionService geldi: ');
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
      `${BASE_URL}/api/admin/options/${id}`,
      requestOptions
    );
    const response = await res.json();
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getOptionFromClientSideService = async () => {
  console.log('getOptionFromClientSideService geldi: ');
  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    redirect: 'follow',
  };
  try {
    const res = await fetch(
      `${BASE_URL}/api/admin/options/getOptionsClientSide`,
      // `${BASE_URL}/api/admin/options`,
      requestOptions
    );

    const response = await res.json();

    return response.options;
  } catch (error) {
    throw new Error(error);
  }
};

const createVariantService = async (data, id) => {
  const res = await fetch(`/api/admin/options/combinations`, {
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

const getSingleOption = async (nextCookies, id) => {
  console.log('getSingleOption');
  return getOptionService(nextCookies, id);
};

const getOptions = async (nextCookies) => {
  console.log('getOptions');
  return getOptionService(nextCookies);
};

const createVariants = async (data) => {
  return createVariantService(data);
};

const getOptionFromClientSide = async () => {
  return getOptionFromClientSideService();
};

export {
  getOptionService,
  getSingleOption,
  getOptions,
  createVariants,
  getOptionFromClientSide,
};

// import { BASE_URL } from '@/config/apiConfig';

// const getOptionService = async (pathname, query = '') => {
//   let headers = new Headers();
//   headers.append('Cookie', `default=${nextCookies.get('default').value}`);
//   headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
//   headers.append('Cookie', `language=${nextCookies.get('language').value}`);
//   headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);
//   headers.append('Cookie', `token=${nextCookies.get('token').value}`);

//   var requestOptions = {
//     cache: 'no-store',
//     method: 'GET',
//     headers: headers,
//     redirect: 'follow',
//   };
//   try {
//     const res = await fetch(
//       `${BASE_URL}/api/admin/options/${id}`,
//       requestOptions
//     );

//     const response = await res.json();

//     return response;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const getSingleOption = async (nextCookies,id) => {
//   return getOptionService(`catalog/option/edit&option_id=${id}`);
// };

// const getOptions = async () => {
//   return getOptionService('catalog/option');
// };

// export { getOptionService, getSingleOption, getOptions };