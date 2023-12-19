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

  //   console.log('response FROM ROUTEJS: ', response);

  const res = await response.json();

  if (res.error_warning) {
    return new Response(
      JSON.stringify({
        status: 401,
        statusText: 'Unauthorized!',
        error: res.error_warning,
      })
    );
  }

  if (res.customer) {
    return new Response(
      JSON.stringify({
        status: 200,
        statusText: 'Login true',
        customer: res.customer,
      })
    );
  }
}
