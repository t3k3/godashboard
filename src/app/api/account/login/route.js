import { API_URL_STORE, _API_URL_STORE } from '@/config/apiConfig';
import getClientHeaders from '@/app/libs/getHeaders';

export async function POST(request) {
  // console.log('POST ISTEK GELDİ');
  const cookies = await getClientHeaders();
  // console.log('cookies: ', cookies);

  const data = await request.json();

  console.log('data: ', data);

  let headers = new Headers();
  cookies.find((cookie) => {
    if (cookie.name === 'CART_ID') {
      headers.append('Cookie', `${cookie.name}=${cookie.value}`);
    }
  });

  // console.log('formdata: ', formdata);

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
    redirect: 'follow',
  };

  const response = await fetch(
    `${_API_URL_STORE}/account/login`,
    requestOptions
  );

  // console.log('response FROM ROUTEJS: ', response);

  if (response.status === 401) {
    return new Response(
      JSON.stringify({
        status: 401,
        statusText: 'Unauthorized!',
        error: 'Unauthorized!',
      })
    );
  }

  if (response.status === 200) {
    const res = await response.json();
    if (res != '') {
      let response = new Response(
        JSON.stringify({
          status: 200,
          statusText: 'Login true',
        })
      );

      response.headers.set(
        'Set-Cookie',
        'SESSION_ID=' + res + '; path=/; HttpOnly'
      );

      return response;
    }
  }

  return new Response(
    JSON.stringify({
      status: 404,
      statusText: 'Login false',
    })
  );
}
