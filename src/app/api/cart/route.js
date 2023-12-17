import { API_URL_STORE, _API_URL_STORE } from '@/config/apiConfig';
import getClientHeaders from '@/app/libs/getHeaders';

export async function GET() {
  // console.log('PUT ISTEK GELDİ');
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

  const response = await fetch(`${_API_URL_STORE}/cart`, requestOptions);

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

export async function POST(request) {
  console.log('POST ISTEK GELDİ');
  const cookies = await getClientHeaders();
  // console.log('cookies: ', cookies);

  const data = await request.json();

  // console.log('data12312312: ', data);

  cookies.find((cookie) => {
    if (cookie.name === 'CART_ID') {
      data.cart_id = cookie.value;
    }
  });

  var requestOptions = {
    method: 'POST',
    // headers: headers,
    body: JSON.stringify(data),
    redirect: 'follow',
  };

  const response = await fetch(`${_API_URL_STORE}/cart`, requestOptions);

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

export async function DELETE(request) {
  console.log('DELETE ISTEK GELDİ');
  const cookies = await getClientHeaders();
  // console.log('cookies: ', cookies)
  const { searchParams } = new URL(request.url);
  const cart_item_id = searchParams.get('cart_item_id');

  let headers = new Headers();
  cookies.find((cookie) => {
    if (cookie.name === 'CART_ID') {
      headers.append('Cookie', `${cookie.name}=${cookie.value}`);
    }
  });

  var requestOptions = {
    method: 'DELETE',
    headers: headers,
    redirect: 'follow',
  };

  const response = await fetch(
    `${_API_URL_STORE}/cart/${cart_item_id}`,
    requestOptions
  );

  console.log('RESPONSE STATUS: ', response.status);

  return new Response(
    JSON.stringify({
      status: response.status,
      statusText: response.statusText,
    })
  );
}

export async function PATCH(request) {
  console.log('PATCH ISTEK GELDİ');
  const cookies = await getClientHeaders();
  // console.log('cookies: ', cookies);

  const data = await request.json();

  console.log('PATCH DATADATA: ', data);

  let headers = new Headers();
  cookies.find((cookie) => {
    if (cookie.name === 'CART_ID') {
      data.cart_id = cookie.value;
    }
  });

  var requestOptions = {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(data),
    redirect: 'follow',
  };

  const response = await fetch(`${_API_URL_STORE}/cart`, requestOptions);

  console.log('RESPONSE STATUS 242343: ', response.status);

  const res = await response.text();

  console.log('RES: ', res);

  return new Response(
    JSON.stringify({
      status: 201,
      statusText: 'success',
    })
  );
}

export async function PUT(request) {
  // console.log('PUT ISTEK GELDİ');
  const cookies = await getClientHeaders();

  const data = await request.json();

  let headers = new Headers();
  cookies.map((cookie) => {
    return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
  });

  let formdata = new FormData();
  formdata.append('coupon', data.coupon);

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: formdata,
    redirect: 'follow',
  };

  const response = await fetch(
    `${API_URL_STORE}extension/total/coupon/coupon`,
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
      status: 201,
      statusText: 'success',
      success: res.success,
    })
  );
}
