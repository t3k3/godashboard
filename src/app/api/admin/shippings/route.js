import { API_URL_ADMIN } from '@/config/apiConfig';
import { cookies } from 'next/headers';
import axios from 'axios';

//get all categories
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
    `${API_URL_ADMIN}/extension/extension/shipping&token=${
      nextCookies.get('token').value
    }`,
    requestOptions
  );

  const res = await response.json();

  if (response.status == 401) {
    return new Response(
      JSON.stringify({
        status: 401,
        statusText: 'Unauthorized!',
        error: res.error_warning,
      })
    );
  }

  if (response.status === 200) {
    // console.log('set');

    return new Response(
      JSON.stringify({
        status: 200,
        extensions: res.extensions,
      })
    );
  }
}
