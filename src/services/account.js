import { BASE_URL } from '@/config/apiConfig';

const logoutService = async (nextCookies) => {
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
    const res = await fetch(`${BASE_URL}/api/admin/logout`, requestOptions);

    // console.log('RES FROM logoutService: ', res);

    const response = await res.text();
    // const response = await res.json();
    console.log('RESPONSE FROM logoutService: ', response);

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const adminLogout = async (nextCookies) => {
  return logoutService(nextCookies);
};

export { adminLogout };
