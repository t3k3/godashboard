import { _API_URL_STORE } from '@/config/apiConfig';
import getClientHeaders from '@/app/libs/getHeaders';

export async function POST(request) {
  console.log('POST ISTEK GELDİ mi');
  const url = new URL(request.url);

  const searchParams = url.searchParams;

  const orderid = searchParams.get('orderid');

  const payment_method = searchParams.get('payment_method');
  const payment_code = searchParams.get('payment_code');
  const cookies = await getClientHeaders();

  // console.log('data12312312: ', data);

  let headers = new Headers();
  cookies.find((cookie) => {
    if (cookie.name === 'CART_ID') {
      headers.append('Cookie', `${cookie.name}=${cookie.value}`);
    }
  });

  var data = {
    order_id: Number(orderid),
    payment_method: Number(payment_method),
    payment_code: Number(payment_code),
  };

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
    redirect: 'follow',
  };

  console.log('data: ', data);
  const response = await fetch(
    `${_API_URL_STORE}/orders/confirm`,
    requestOptions
  );
  console.log('response.status 111111: ', response.status);

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
