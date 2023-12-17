import { _API_URL_STORE } from '@/config/apiConfig';
import getClientHeaders from '@/app/libs/getHeaders';

export async function GET() {
  const cookies = await getClientHeaders();

  const headers = new Headers();

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
    method: 'GET',
    headers: headers,
    // body: JSON.stringify(data),
    redirect: 'follow',
  };

  const response = await fetch(`${_API_URL_STORE}/layout`, requestOptions);

  //   console.log('RESPONSE2344234345345: ', response.status);

  if (response.status === 200) {
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
