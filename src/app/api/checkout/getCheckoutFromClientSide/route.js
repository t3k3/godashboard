import { API_URL_STORE } from '@/config/apiConfig';
import getClientHeaders from '@/app/libs/getHeaders';

export async function GET(request) {
  // console.log('PUT ISTEK GELDİ');
  const cookies = await getClientHeaders();

  // const data = await request.json();

  let headers = new Headers();
  cookies.map((cookie) => {
    return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
  });

  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    headers: headers,
    // body: formdata,
    redirect: 'follow',
  };

  const response = await fetch(
    `${API_URL_STORE}/checkout/checkout`,
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

      cart: res,
    })
  );
}
