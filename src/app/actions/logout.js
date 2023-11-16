'use server';
import { API_URL_ADMIN } from '@/config/apiConfig';
import { cookies } from 'next/headers';

export async function LogoutAction() {
  console.log('GELDİ LOGOUT ACTİONS');

  const nextCookies = cookies();

  console.log('GELDİ');

  let headers = new Headers();
  headers.append('Cookie', `default=${nextCookies.get('default').value}`);
  headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
  headers.append('Cookie', `language=${nextCookies.get('language').value}`);
  headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);

  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  const response = await fetch(
    `${API_URL_ADMIN}/common/logout&token=${nextCookies.get('token').value}`,
    requestOptions
  );

  // nextCookies.delete('token');

  // console.log('response.status: ', response.status);
  const res = await response.json();

  console.log('RES FROM ACTİONS: ', res);

  return res;

  // if (response.status == 401) {
  //   return new Response(
  //     JSON.stringify({
  //       status: 401,
  //       statusText: 'Unauthorized!',
  //       error: res.error_warning,
  //     })
  //   );
  // }

  // if (response.status === 200) {
  //   // console.log('set');

  //   return new Response(
  //     JSON.stringify({
  //       status: 200,
  //       statusText: 'login true',
  //       customerOrders: res,
  //     })
  //   );
  // }
}
