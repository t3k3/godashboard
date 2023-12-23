import { _API_URL_STORE } from '@/config/apiConfig';
import getClientHeaders from '@/app/libs/getHeaders';

export async function POST(request) {
  console.log('POST ISTEK GELDİ');
  const cookies = await getClientHeaders();

  const data = await request.json();

  // console.log('data12312312: ', data);

  let headers = new Headers();
  cookies.find((cookie) => {
    if (cookie.name === 'CART_ID') {
      headers.append('Cookie', `${cookie.name}=${cookie.value}`);
    }
  });
  cookies.find((cookie) => {
    if (cookie.name === 'SESSION_ID') {
      headers.append('Cookie', `${cookie.name}=${cookie.value}`);
    }
  });

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
    redirect: 'follow',
  };

  const response = await fetch(`${_API_URL_STORE}/orders`, requestOptions);
  console.log('response.status 111111: ', response.status);
  if (response.status === 201) {
    const res = await response.json();

    return new Response(
      JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        data: res,
      })
    );
  }
}

export async function GET(request) {
  const url = new URL(request.url);

  const searchParams = url.searchParams;

  const orderid = searchParams.get('orderid');

  const cookies = await getClientHeaders();

  // const data = await request.json();

  let headers = new Headers();
  cookies.find((cookie) => {
    if (cookie.name === 'CART_ID') {
      headers.append('Cookie', `${cookie.name}=${cookie.value}`);
    }
  });

  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  const response = await fetch(
    `${_API_URL_STORE}/orders/payment/${orderid}`,
    requestOptions
  );

  const res = await response.json();

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
      payment: res,
    })
  );
}
