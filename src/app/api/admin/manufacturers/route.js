import { _API_URL_ADMIN } from '@/config/apiConfig';
import { cookies } from 'next/headers';

export async function GET(request) {
  const nextCookies = cookies();

  let headers = new Headers();
  // headers.append('Cookie', `default=${nextCookies.get('default').value}`);
  // headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
  // headers.append('Cookie', `language=${nextCookies.get('language').value}`);
  // headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);

  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  const response = await fetch(
    `${_API_URL_ADMIN}/manufacturers`,
    requestOptions
  );

  // console.log('response.status: ', response.status);
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
        statusText: 'login true',
        manufacturers: res,
      })
    );
  }
}

export async function POST(request) {
  const data = await request.json();

  console.log('DATA123: ', data);

  try {
    const response = await fetch(`${_API_URL_ADMIN}/manufacturers`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Stringify the data before sending
    });

    console.log('response.status: ', response.status);
    console.log('response.text: ', response.text);

    if (response.status === 201) {
      return new Response(
        JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          data: response.data,
        })
      );
    }
  } catch (error) {
    console.log('ERRRRROSOS: ', error);
    return new Response(
      JSON.stringify({
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      })
    );
  }
}
