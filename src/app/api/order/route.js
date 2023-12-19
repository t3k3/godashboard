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
