import {
  API_URL_STORE,
  _API_URL_ADMIN,
  _API_URL_STORE,
} from '@/config/apiConfig';
import getClientHeaders from '@/app/libs/getHeaders';

export async function POST(request) {
  const cookies = await getClientHeaders();

  const data = await request.json();

  console.log('DATA 12345: ', data);

  let headers = new Headers();
  cookies.find((cookie) => {
    if (cookie.name === 'CART_ID') {
      headers.append('Cookie', `${cookie.name}=${cookie.value}`);
    }
  });

  var requestOptions = {
    method: 'PATCH',
    cache: 'no-store',
    headers: headers,
    body: data,
    redirect: 'follow',
  };

  // console.log('FORMDATA: ', formdata);

  const response = await fetch(
    `${_API_URL_STORE}/cart/checkout`,
    requestOptions
  );

  // console.log('RESPONSE: ', response);
  const res = await response.json();
  console.log('RES345345: ', res);

  if (res.error) {
    return new Response(
      JSON.stringify({
        status: 404,
        error: res.error,
      })
    );
  }

  return new Response(
    JSON.stringify({
      status: 200,
      cart: res,
    })
  );
}
