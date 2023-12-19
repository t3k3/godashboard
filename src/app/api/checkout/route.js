import { _API_URL_STORE } from '@/config/apiConfig';
import getClientHeaders from '@/app/libs/getHeaders';

export async function GET(request) {
  const url = new URL(request.url);

  const searchParams = url.searchParams;

  const shipping = searchParams.get('shipping');
  const coupon = searchParams.get('coupon');

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
    `${_API_URL_STORE}/cart/checkout?shipping=${shipping}&coupon=${coupon}`,
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
      checkout: res,
    })
  );
}
