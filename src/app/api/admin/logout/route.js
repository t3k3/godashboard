import { API_URL_ADMIN } from '@/config/apiConfig';
import { cookies } from 'next/headers';

export async function GET(request) {
  const nextCookies = cookies();

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

  // resp.setHeader('Set-Cookie', [`token=deleted; Max-Age=0; path=/`]);

  console.log('response FROM ROUTEJS API ADMIN LOGOUT: ', response.status);

  // const res = await response.json();

  return new Response(
    JSON.stringify({
      status: 200,
      statusText: 'login true',
    }),
    {
      headers: {
        'Set-Cookie': `token=deleted; Path=/;`,
      },
    }
  );
}
