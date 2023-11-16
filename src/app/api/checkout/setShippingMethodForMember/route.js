import { API_URL_STORE } from '@/config/apiConfig';
import getClientHeaders from '@/app/libs/getHeaders';

export async function POST(request) {
  const cookies = await getClientHeaders();

  const data = await request.json();

  console.log('DATA 12345: ', data);

  let formdata = new FormData();

  formdata.append('address_id', data.address_id);

  if (data.address_type == 'shipping_address') {
    formdata.append('shipping_address', 'existing');

    let headers = new Headers();
    cookies.map((cookie) => {
      return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
    });

    var requestOptions = {
      method: 'POST',
      cache: 'no-store',
      headers: headers,
      body: formdata,
      redirect: 'follow',
    };

    console.log('FORMDATA: ', formdata);

    const response = await fetch(
      `${API_URL_STORE}/checkout/shipping_address/save`,
      requestOptions
    );

    // console.log('RESPONSE: ', response);
    const res = await response.json();
    console.log('RES: ', res);

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
  if (data.address_type == 'payment_address') {
    formdata.append('payment_address', 'existing');

    let headers = new Headers();
    cookies.map((cookie) => {
      return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
    });

    var requestOptions = {
      method: 'POST',
      cache: 'no-store',
      headers: headers,
      body: formdata,
      redirect: 'follow',
    };

    console.log('FORMDATA payment: ', formdata);

    const response = await fetch(
      `${API_URL_STORE}/checkout/payment_address/save`,
      requestOptions
    );

    // console.log('RESPONSE: ', response);
    const res = await response.json();
    console.log('RES: ', res);

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
}
