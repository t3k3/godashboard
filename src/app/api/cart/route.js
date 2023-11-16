import { API_URL_STORE } from '@/config/apiConfig';
import getClientHeaders from '@/app/libs/getHeaders';

export async function POST(request) {
  console.log('POST ISTEK GELDİ');
  const cookies = await getClientHeaders();
  // console.log('cookies: ', cookies);

  const data = await request.json();

  let headers = new Headers();
  cookies.map((cookie) => {
    return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
  });

  let formdata = new FormData();
  formdata.append('product_id', data.product_id);
  formdata.append('quantity', data.quantity);

  data.option.map((opt) => {
    return formdata.append(`option[${opt.name}]`, opt.value);
  });

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: formdata,
    redirect: 'follow',
  };

  const response = await fetch(
    `${API_URL_STORE}checkout/cart/add`,
    requestOptions
  );
  const res = await response.json();
  console.log('RESPONSE76657: ', res);

  return new Response(
    JSON.stringify({
      status: res.status,
      statusText: res.statusText,
      data: res.data,
      error: res.error,
    })
  );
}

export async function DELETE(request) {
  console.log('DELETE ISTEK GELDİ');
  const cookies = await getClientHeaders();
  // console.log('cookies: ', cookies)
  const { searchParams } = new URL(request.url);
  const cart_id = searchParams.get('cart_id');

  let headers = new Headers();
  cookies.map((cookie) => {
    return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
  });

  let formdata = new FormData();
  formdata.append('key', cart_id);

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: formdata,
    redirect: 'follow',
  };

  const response = await fetch(
    `${API_URL_STORE}checkout/cart/remove`,
    requestOptions
  );

  const res = await response.json();

  return new Response(
    JSON.stringify({
      status: res.status,
      statusText: res.statusText,
      success: res.success,
      total: res.total,
    })
  );
}

export async function PATCH(request) {
  console.log('PATCH ISTEK GELDİ');
  const cookies = await getClientHeaders();
  // console.log('cookies: ', cookies);

  const data = await request.json();
  console.log('DATA: ', data);
  let headers = new Headers();
  cookies.map((cookie) => {
    return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
  });

  let formdata = new FormData();

  formdata.append('key', data.cart_id);
  formdata.append(`quantity[${data.cart_id}]`, data.quantity);

  //TODO manuel eklendi düzenlenecek
  formdata.append('product_id', '7352');

  console.log('formdata: ', formdata);

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: formdata,
    redirect: 'follow',
  };

  const response = await fetch(
    `${API_URL_STORE}checkout/cart/guncelle`,
    requestOptions
  );

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
